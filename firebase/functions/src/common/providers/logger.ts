import { logger } from "firebase-functions";

/**
 * Log an info level message to `stdout` of the Cloud Logging entry.
 *
 * @param message - Message to be printed.
 * @param context - Additional context regarding the entry.
 */
export function log(message: string, context?: unknown): void {
  logger.log(["[ℹ]", message].join(" "), {
    context,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Log a warning level message to `stdout` of the Cloud Logging entry.
 *
 * @param message - Message to be printed.
 * @param context - Additional context regarding the entry.
 */
export function warn(message: string, context?: unknown): void {
  logger.warn(["[⚠]", message].join(" "), {
    context,
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
export function error(
  message: string,
  cause?: unknown,
  context?: unknown
): void {
  logger.error(["[❗]", message].join(" "), {
    context,
    cause,
    timestamp: new Date().toISOString(),
  });
}
