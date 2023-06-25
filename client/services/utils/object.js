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
 * that are `null`, `undefined`, `""`, and have not
 * change from a `ref` object.
 *
 * @private
 *
 * @template {Record<string | number | symbol, any>} T
 * @param {T} obj - The object to be stripped from.
 * @param {Record<string | number | symbol, any>} ref - The object to reference from.
 * @returns {Partial<T>} The stripped object.
 */
export function stripEmptyAndUnchanged(obj, ref) {
  const entries = Object.entries(obj).filter(([k, v]) => {
    const isUndefined = typeof v === "undefined";
    const isNull = v === null;
    const isEmpty = v === "";
    const isUnchanged = ref[k] === v;

    return !(isUndefined || isNull || isEmpty || isUnchanged);
  });

  return Object.fromEntries(entries);
}
