import { logger } from "firebase-functions";

/**
 * Log an info level message to `stdout` of the Cloud Logging entry.
 *
 * @param {string} message - Message to be printed.
 * @param {Record<string, unknown>} context - Additional context regarding the entry.
 * @return {void}
 */
export function log(message: string, context?: Record<string, unknown>): void {
  return logger.log(["[ℹ]", message].join(" "), {
    context,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Log a warning level message to `stdout` of the Cloud Logging entry.
 *
 * @param {string} message - Message to be printed.
 * @param {Record<string, unknown>} context - Additional context regarding the entry.
 * @return {void}
 */
export function warn(message: string, context?: Record<string, unknown>): void {
  return logger.warn(["[⚠]", message].join(" "), {
    context,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Log an error level message to the `stderr` of the Cloud Logging entry.
 *
 * @param {string} message - Message to be printed.
 * @param {unknown} cause - The error that was triggered.
 * @param {Record<string, unknown>} context - Additional context regarding the error entry.
 * @return {void}
 */
export function error(
  message: string,
  cause?: unknown,
  context?: Record<string, unknown>
): void {
  return logger.error(["[❗]", message].join(" "), {
    context,
    cause,
    timestamp: new Date().toISOString(),
  });
}
