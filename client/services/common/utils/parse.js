/**
 * Parser for functions that converts throwables
 * such as Errors to instead be part of the returned value,
 * along with the data returned from the function.
 *
 * @template T
 * @param {() => (Promise<T> | T)} fn - A function with
 * throwables that is to be converted.
 * @return {Promise<{ data: T extends void ? null : T | null, error: Error | null }>}
 * @returns
 */
export async function parseThrowablesToObject(fn) {
  let data = null;
  let error = null;

  try {
    data = await fn();

    // This is to ensure that data can only be null or the data itself,
    // since the function can return void which sets data to undefined.
    data ??= null;
  } catch (ex) {
    data = null;
    error = Error.prototype.isPrototypeOf(ex) ? ex : new Error(ex);
  }

  return { data, error };
}
