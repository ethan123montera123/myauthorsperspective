import { logger as firebaseLogger } from "firebase-functions";

/**
 * Logger object for logging.
 */
const logger = {
  /**
   * Log an info level message to `stdout` of the Cloud Logging entry.
   *
   * @param message - Message to be printed.
   * @param context - Additional context regarding the entry.
   */
  log(message: string, context?: Record<string, any>): void {
    return firebaseLogger.log(["[ℹ]", message].join(" "), {
      context,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Log a warning level message to `stdout` of the Cloud Logging entry.
   *
   * @param message - Message to be printed.
   * @param context - Additional context regarding the entry.
   */
  warn(message: string, context?: Record<string, any>): void {
    return firebaseLogger.warn(["[⚠]", message].join(" "), {
      context,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Log an error level message to the `stderr` of the Cloud Logging entry.
   *
   * @param message - Message to be printed.
   * @param cause - The error that was triggered.
   * @param context - Additional context regarding the error entry.
   */
  error(message: string, cause?: Error, context?: Record<string, any>): void {
    return firebaseLogger.error(["[❗]", message].join(" "), {
      context,
      cause,
      timestamp: new Date().toISOString(),
    });
  },
};

export default logger;
