import { logger as firebaseLogger } from "firebase-functions";

/**
 * Logger object for logging.
 */
const logger = {
  /**
   * Log an info level message to `stdout` of the Cloud Logging entry.
   *
   * @param {string} message - Message to be printed.
   * @param {Record<string, unknown>} context - Additional context regarding the entry.
   * @return {void}
   */
  log(message: string, context?: Record<string, unknown>): void {
    return firebaseLogger.log(["[ℹ]", message].join(" "), {
      context,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Log a warning level message to `stdout` of the Cloud Logging entry.
   *
   * @param {string} message - Message to be printed.
   * @param {Record<string, unknown>} context - Additional context regarding the entry.
   * @return {void}
   */
  warn(message: string, context?: Record<string, unknown>): void {
    return firebaseLogger.warn(["[⚠]", message].join(" "), {
      context,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Log an error level message to the `stderr` of the Cloud Logging entry.
   *
   * @param {string} message - Message to be printed.
   * @param {unknown} cause - The error that was triggered.
   * @param {Record<string, unknown>} context - Additional context regarding the error entry.
   * @return {void}
   */
  error(
    message: string,
    cause?: unknown,
    context?: Record<string, unknown>
  ): void {
    return firebaseLogger.error(["[❗]", message].join(" "), {
      context,
      cause,
      timestamp: new Date().toISOString(),
    });
  },
};

export default logger;
