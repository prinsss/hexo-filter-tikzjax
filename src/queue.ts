export interface Task {
  id: number;
  processor: () => Promise<unknown>;
}

export interface Logger {
  debug: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

/**
 * A simple task queue that runs tasks in sequence.
 */
export class TaskQueue {
  private lastTaskId = 0;
  private taskQueue: Task[] = [];
  private currentTask: Task | undefined;
  private logger: Logger = console;

  /**
   * Set the logger.
   */
  public setLogger(logger: Logger) {
    this.logger = logger;
  }

  /**
   * Add a task to the queue.
   */
  public enqueue(func: Task['processor']) {
    this.taskQueue.push({
      id: this.lastTaskId++,
      processor: func,
    });
    this.run();
  }

  /**
   * Run the next task in queue.
   */
  private async run() {
    if (this.currentTask || this.taskQueue.length === 0) {
      return;
    }

    const task = this.taskQueue.shift();
    this.currentTask = task;

    if (task) {
      try {
        this.logger.debug('Running task...', task.id);
        await task.processor();
        this.logger.debug('Task done!', task.id);
      } catch (err) {
        this.logger.error('Task failed!', task.id, err);
      }
    }

    this.currentTask = undefined;
    this.run();
  }
}

/**
 * Global task queue singleton.
 */
const taskQueue = new TaskQueue();

export default taskQueue;
