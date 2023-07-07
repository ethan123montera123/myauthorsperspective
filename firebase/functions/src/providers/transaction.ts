import * as logger from "./logger";

type AsyncFunction<T> = T extends (...args: infer A) => infer R
  ? ((...args: A) => R) | ((...args: A) => Promise<R>)
  : never;

export type Action = {
  /**
   * Identifier for the action.
   */
  name: string;
  /**
   * The main function to be executed in the action. This
   * can return a function that would be used to rollback the
   * changes made from the action, if ever an error occurs
   * at the later stages.
   */
  execute:
    | AsyncFunction<() => AsyncFunction<() => void>>
    | AsyncFunction<() => void>;
  /**
   * An event hook to subscribe to the error, if it occurs.
   */
  catch: AsyncFunction<(err: unknown) => void>;
};

/**
 * Function that commits a set of action in a transaction. It executes
 * each action, and if one of the action `throws` it then rollbacks the
 * changes gracefully.
 *
 * @param actions The set of actions that are to be sequentially
 * executed in the transaction.
 * @returns The first error of the transaction commit, or null.
 */
export async function commit(...actions: Action[]) {
  let error: unknown = null;
  let action: Action | null = null;
  const rollbacks: Record<
    Action["name"],
    Awaited<ReturnType<Action["execute"]>>
  > = {};

  try {
    for (action of actions) {
      const rollback = await action.execute();
      rollbacks[action.name] = rollback;
    }
  } catch (execError) {
    error = execError;
    await action?.catch(execError);

    const validRollbacks = Object.fromEntries(
      Object.entries(rollbacks).filter((arg) => typeof arg[1] === "function")
    ) as {
      [K in keyof typeof rollbacks]: Exclude<(typeof rollbacks)[K], void>;
    };

    const rbNames = Object.keys(validRollbacks);
    const promises = Object.values(validRollbacks).map((fn) => fn());

    logger.log("Rolling back previous changes...", { rollbacks: rbNames });

    const results = await Promise.allSettled(promises);
    const success = results.filter((r) => r.status === "fulfilled");
    const failed = results.filter((r) => r.status === "rejected");

    if (success.length === results.length) {
      logger.log("Rolling back successful.", {
        rollbacks: rbNames,
        success: success.length,
      });
    } else {
      logger.error("Rolling back failed.", execError, {
        rollbacks: rbNames,
        success: success.length,
        failed: {
          count: failed.length,
          reasons: (
            failed as (PromiseSettledResult<void> & { reason: unknown })[]
          ).map((f) => f["reason"]),
        },
      });
    }
  }

  return error;
}
