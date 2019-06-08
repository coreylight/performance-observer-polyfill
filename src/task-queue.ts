import EntryList from "./entry-list";

class PerformanceObserverTaskQueue {
  private registeredObservers: Set<Observer>;
  private processedEntries: Set<Entry>;
  private interval: number;
  private intervalId: any; // Node and Browsers have different types for this.
  private context: any;

  public constructor({
    registeredObservers = new Set(),
    processedEntries = new Set(),
    interval = 100,
    context = window || self
  }: PerformanceObserverTaskQueueOptions = {}) {
    this.registeredObservers = registeredObservers;
    this.processedEntries = processedEntries;
    this.interval = interval;
    this.context = context;
    this.intervalId = null;
  }

  public getNewEntries(): Entry[] {
    const entries = this.context.performance.getEntries();
    return entries.filter(
      (entry: Entry): boolean => !this.processedEntries.has(entry)
    );
  }

  public getObserversForType(
    observers: Set<Observer>,
    type: string
  ): Observer[] {
    return Array.from(observers).filter((observer: Observer): boolean => {
      return observer.entryTypes.some((t): boolean => t === type);
    });
  }

  public processBuffer(observer: Observer): void {
    const entries = Array.from(observer.buffer);
    const entryList = new EntryList(entries);
    observer.buffer.clear();

    if (entries.length && observer.callback) {
      observer.callback.call(undefined, entryList, observer);
    }
  }

  public processEntries(): void {
    const entries = this.getNewEntries();

    entries.forEach((entry): void => {
      // Get interested observers for entry type
      // QUESTION: an entry object didn't seem to have an entryType, only a type
      // therefore the old version of this code (next line), seems to be a bug?
      // const { entryType: type } = entry;
      const { type } = entry;
      const observers = this.getObserversForType(
        this.registeredObservers,
        type
      );
      // Add the entry to observer buffer
      observers.forEach((observer): void => {
        observer.buffer.add(entry);
      });
      // Mark the entry as processed
      this.processedEntries.add(entry);
    });

    // Queue task to process all observer buffers
    requestAnimationFrame((): void => {
      this.registeredObservers.forEach(this.processBuffer);
    });
  }

  public add(observer: Observer): void {
    this.registeredObservers.add(observer);

    if (this.registeredObservers.size === 1) {
      this.observe();
    }
  }

  public remove(observer: Observer): void {
    this.registeredObservers.delete(observer);

    if (!this.registeredObservers.size) {
      this.disconnect();
    }
  }

  public observe(): void {
    this.intervalId = setInterval(
      this.processEntries.bind(this),
      this.interval
    );
  }

  public disconnect(): void {
    this.intervalId = clearInterval(this.intervalId);
  }
}

export default PerformanceObserverTaskQueue;
