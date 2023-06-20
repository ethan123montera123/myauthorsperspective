/**
 * Pick only certain properties from an object.
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

/**
 * Strips properties that have undefined values from an object.
 *
 * @template {Record<string | number, any>} T
 * @param {T} obj
 * @returns {Pick<T, { [K in keyof T]: T[K] extends undefined | null ? never : K}[keyof T]>} The stripped object.
 */
export function stripUndefined(obj) {
  const nonFalsyValueEntries = Object.entries(obj).filter(
    ([_k, v]) => typeof v !== "undefined"
  );

  return Object.fromEntries(nonFalsyValueEntries);
}
