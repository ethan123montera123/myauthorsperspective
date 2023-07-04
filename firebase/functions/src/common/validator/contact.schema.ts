import { z } from "zod";

/**
 * Formats a name field by putting text in sentence case,
 * and stripping whitespaces to one spaces.
 *
 * @param s The string to be formatted.
 * @return The formatted string.
 */
function formatName(s: string) {
  const trimmedAndSpaced = s.trim().replace(/\s+/g, " ");
  const sentenceCased = trimmedAndSpaced
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");

  return sentenceCased;
}

export const contactSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1)
      .max(256)
      .regex(
        /^[a-zA-Z][a-zA-Z\-._ ]+[a-zA-Z]$/,
        "Must only contain alpha characters, whitespace, ., -, and _."
      ),
    lastName: z
      .string()
      .trim()
      .min(1)
      .max(256)
      .regex(
        /^[a-zA-Z][a-zA-Z\-._ ]+[a-zA-Z]$/,
        "Must only contain alpha characters, whitespace, ., -, and _."
      ),
    email: z.string().email(),
    subject: z.string().trim().min(1).max(256),
    message: z.string().trim().min(1),
  })
  .strip()
  .required()
  .transform(({ firstName, lastName, ...rest }) => ({
    name: formatName(firstName) + " " + formatName(lastName),
    ...rest,
  }));
