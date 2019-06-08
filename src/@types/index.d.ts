interface Entry {
  name: string;
  type: string;
}

type ObserverCallback = (
  // entryList: typeof import("../entry-list"),
  entryList: any, // FIXME: above is not working.
  observer: Observer
) => void;

interface Observer {
  buffer: Set<Entry>;
  callback?: ObserverCallback;
  entryTypes: string[];
}

interface PerformanceObserverTaskQueueOptions {
  registeredObservers?: Set<Observer>;
  processedEntries?: Set<Entry>;
  interval?: number;
  context?: any;
}
