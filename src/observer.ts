import PerformanceObserverTaskQueue from "./task-queue.js";

const VALID_TYPES = ["mark", "measure", "navigation", "resource"];
const ERRORS = {
  "no-entry-types": `Failed to execute 'observe' on 'PerformanceObserver': required member entryTypes is undefined.`,
  "invalid-entry-types": `Failed to execute 'observe' on 'PerformanceObserver': A Performance Observer MUST have at least one valid entryType in its entryTypes attribute.`
};

// FIXME
type ObserverCallback = (entryList: any, observer: any) => void;

const isValidType = (type: string): boolean =>
  VALID_TYPES.some(t => type === t);

const globalTaskQueue = new PerformanceObserverTaskQueue();

class PerformanceObserver implements Observer {
  callback?: ObserverCallback;
  entryTypes: string[] = [];
  buffer: Set<Entry>; // FIXME: used?
  taskQueue: PerformanceObserverTaskQueue;

  public constructor(callback: ObserverCallback, taskQueue = globalTaskQueue) {
    this.callback = callback || null;
    this.buffer = new Set();
    // this.taskQueue: PerformanceObserverTaskQueue = taskQueue;
    this.taskQueue = new PerformanceObserverTaskQueue();
  }

  /**
   *
   * @param options - This is a PerformanceObserverInit dictionary,
   *   with an entryTypes property which is an array of DOMString objects.
   *   None of these are easily modeled in node.
   */
  observe(options: any) {
    if (!options.entryTypes) {
      throw new Error(ERRORS["no-entry-types"]);
    }

    const entryTypes: string[] = options.entryTypes.filter(isValidType);

    if (!entryTypes.length) {
      throw new Error(ERRORS["invalid-entry-types"]);
    }

    this.entryTypes = entryTypes;

    this.taskQueue.add(this as Observer);
  }

  disconnect() {
    this.taskQueue.remove(this as Observer);
  }
}

export default PerformanceObserver;
