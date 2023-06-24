/**
 * Pick only certain properties from an object.
 *
 * @private
 *
 * @template {Record<string | number | symbol, any>} T
 * @template {keyof T} K
 * @param {T} obj - The object to be picked from.
 * @param  {K[]} keys - The keys to pick.
 * @returns {Pick<T, K>} The picked object.
 */
export function pick(obj, ...keys) {
  const pickedEntries = keys.map((k) => [k, obj[k]]);

  return Object.fromEntries(pickedEntries);
}

/**
 * Strip properties from object that have values
 * that are `null`, `undefined`, and `""`.
 *
 * @private
 *
 * @template {Record<string | number | symbol, any>} T
 * @param {T} obj - The object to be stripped from.
 * @returns {Partial<T>} The stripped object.
 */
export function stripEmpty(obj) {
  const entries = Object.entries(obj).filter(
    ([_k, v]) => typeof v !== "undefined" || v !== null || v !== ""
  );

  return Object.fromEntries(entries);
}
