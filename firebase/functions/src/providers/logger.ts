import { logger } from "firebase-functions";

/**
 * Logger class for logging.
 */
class Logger {
  /**
   * @param context - Sets the calling context of the logger.
   */
  constructor(private readonly context: string) {}

  /**
   * Log an info level message to `stdout` of the Cloud Logging entry.
   *
   * @param message - Message to be printed.
   * @param context - Additional context regarding the entry.
   */
  log(message: string, context?: Record<string, any>): void {
    return logger.log(message, {
      context,
      caller: this.context,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log a warning level message to `stdout` of the Cloud Logging entry.
   *
   * @param message - Message to be printed.
   * @param context - Additional context regarding the entry.
   */
  warn(message: string, context?: Record<string, any>): void {
    return logger.warn(message, {
      context,
      caller: this.context,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log an error level message to the `stderr` of the Cloud Logging entry.
   *
   * @param message - Message to be printed.
   * @param cause - The error that was triggered.
   * @param context - Additional context regarding the error entry.
   */
  error(message: string, cause?: Error, context?: Record<string, any>): void {
    return logger.error(message, {
      context,
      cause,
      caller: this.context,
      timestamp: new Date().toISOString(),
    });
  }
}

export default Logger;
