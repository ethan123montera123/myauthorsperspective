/**
 * Pick only certain properties from an object.
 *
 * @private
 *
 * @template {Record<string | number, any>} T
 * @template {keyof T} K
 * @param {T} obj - The object to be picked from.
 * @param  {K[]} keys - The keys to pick.
 * @returns {Pick<T, K>} The picked object.
 */
export function pick(obj, ...keys) {
  const pickedEntries = keys.map((k) => [k, obj[k]]);

  return Object.fromEntries(pickedEntries);
}
