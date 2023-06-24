/**
 * @template T
 * @typedef {object} ObjectWithError
 * @property {T extends void ? null : (T | null)} data
 * @property {Error | null} error
 */

/**
 * Utility function to parse functions that have `throwables` into a function that
 * returns the `throwables` instead along with the data.
 *
 * @template T
 * @param {() => Promise<void> | () => void} fn The function to be parsed.
 * @return {Promise<ObjectWithError<T>>} An object containing the data, and parsed `throwables`.
 *
 * @example
 * async function foo() {
 *  return parseThrowablesToObject(() => {
 *    return 1;
 *  });
 * }
 *
 * const { data, error } = await foo();
 */
export async function parseThrowablesToObject(fn) {
  let data = null;
  let error = null;

  try {
    data = await fn();

    // Sets data back to null, if ever data is set to undefined
    // caused by void functions.
    data ??= null;
  } catch (err) {
    error = Error.prototype.isPrototypeOf(err) ? err : new Error(err);
    data = null;
  }

  return { data, error };
}
