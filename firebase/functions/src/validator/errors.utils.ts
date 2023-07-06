import { ZodIssue } from "zod";

type FormattedError = {
  [s: string]: ZodIssue["message"][] | FormattedError;
};

/**
 * @summary Parses Zod paths to an object form.
 * @description
 * Zod errors typically contain issues that look like in this form:
 * ```js
 * [
 *  {
 *    // The first one is the index of an array, and then the field with an error
 *    path: [0, 'firstName'],
 *    message: "Some message."
 *  },
 *  {
 *    path: [0, 'firstName'],
 *    message: "Some message 2."
 *  },
 *  {
 *    path: [0, 'lastName'],
 *    message: "Some message."
 *  },
 *  {
 *    path: [1, 'firstName'],
 *    message: "Some message."
 *  },
 * ]
 * ```
 * The goal of this function is then to group paths into a nested object.
 * This results in the following form:
 * ```js
 * {
 *    '0': {
 *      firstName: [
 *        "Some Message",
 *        "Some message 2."
 *      ],
 *      lastName: [
 *        "Some message."
 *      ]
 *    },
 *    '1': {
 *      firstName: [
 *        "Some message."
 *      ]
 *    }
 * }
 * ```
 *
 * @param errors The Zod issues to be parsed.
 * @returns The Zod issues formatted to a nested object.
 */
export function parseErrors(errors: ZodIssue[]): FormattedError {
  const buckets: Record<string | number, ZodIssue[]> = {};
  let path: string | number | undefined;

  // Groups errors with the same first path value
  // under that path value in an array
  for (const error of errors) {
    path = error.path.shift();

    if (typeof path !== "undefined") {
      if (!buckets[path]) {
        buckets[path] = [];
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      buckets[path]!.push(error);
    }
  }

  // Recursively parse sub errors
  const parsedBuckets: FormattedError = {};
  for (const [bucket, subErrors] of Object.entries(buckets)) {
    // A leaf path is a path that contains a child that
    // does has an empty path. For example:
    // { firstName: [{ path: [], message: "Some message." }]}
    const isLeaf = subErrors.some(({ path }) => path.length === 0);

    // If the bucket is a leaf
    parsedBuckets[bucket] = isLeaf
      ? // There is no longer errors to parse, so map the sub errors
        // to their messages
        subErrors.map(({ message }) => message)
      : // Else, recursively parse the sub errors
        parseErrors(subErrors);
  }

  return parsedBuckets;
}
