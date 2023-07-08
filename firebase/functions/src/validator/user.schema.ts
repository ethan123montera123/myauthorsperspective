import { auth } from "firebase-admin";
import { z } from "zod";
import { config, firebase } from "../providers";

/**
 * Formats a name field by putting text in propercase case,
 * and stripping whitespaces to one spaces.
 *
 * @param s The string to be formatted.
 * @return The formatted string.
 */
function formatName(s: string) {
  const trimmedAndSpaced = s.trim().replace(/\s+/g, " ");
  const properCase = trimmedAndSpaced
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");

  return properCase;
}

export const getUserSchema = (uid = "") =>
  z
    .object({
      firstName: z
        .string()
        .trim()
        .nonempty()
        .max(256)
        .regex(
          /**
           * ^                                            Start anchor
           * [a-zA-Z]                                     Ensure string starts with an alpha character.
           * (\s*[^!@#$%^&*|:<>,.?~`_={};+()[\]\-\\]+)*  Ensure string does not contain invalid characters, but can contain spaces.
           * $                                            End anchor.
           */
          /^[a-zA-Z](\s*[^!@#$%^&*|:<>,.?~`_={};+()[\]\-\\]+)*$/,
          "First name contains invalid characters."
        )
        .transform(formatName),
      lastName: z
        .string()
        .trim()
        .max(256)
        .refine(
          (val) => {
            /**
             * ^                                            Start anchor
             * [a-zA-Z]                                     Ensure string starts with an alpha character.
             * (\s*[^!@#$%^&*|:<>,.?~`_={};+()[\]\-\\]+)*  Ensure string does not contain invalid characters, but can contain spaces.
             * $                                            End anchor.
             */
            const regex =
              /^[a-zA-Z](\s*[^!@#$%^&*|:<>,.?~`_={};+()[\]\-\\]+)*$/;

            return !val || regex.test(val);
          },
          {
            message: "Last name contains invalid characters.",
          }
        )
        .transform(formatName)
        .optional()
        .default(""),
      email: z
        .string()
        .trim()
        .nonempty()
        .email()
        .refine(
          async (email) => {
            let allowed = false;

            try {
              const user = await auth().getUserByEmail(email);
              // Valid if uid matches, which means the user owns that email
              allowed = user.uid === uid;
            } catch (err) {
              // Or if user does not exist which means email is unused,
              allowed = true;
            }

            return allowed;
          },
          {
            message: "Email is already in use.",
          }
        ),
      phone: z
        .string()
        .trim()
        .nonempty()
        .regex(
          /**
           * @link https://uibakery.io/regex-library/phone-number
           */
          /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
          "Invalid phone number format."
        )
        .refine(
          async (phone) => {
            const snap = await firebase.db
              .collection(config.firebase.collections.USERS)
              .where("phone", "==", phone)
              .get();

            // Valid if there are no matches which means phone is unused,
            // Or if all docs in the snapshot matches the uid of the user
            // which means the phone number passed is owned by the user
            return snap.size === 0 || snap.docs.every((doc) => doc.id === uid);
          },
          {
            message: "Phone number is already in use.",
          }
        ),
      password: z
        .string()
        .nonempty()
        .min(8, "Password must at least have 8 characters")
        .regex(
          /**
           * ^                         Start anchor
           * (?=.*[A-Z])               Ensure string has one uppercase letter.
           * (?=.*[!@#$&*])            Ensure string has one special character.
           * (?=.*[0-9])               Ensure string has one digit.
           * (?=.*[a-z])               Ensure string has one lowercase letter.
           * .{8,}                     Ensure string is at least a length of 8.
           * $                         End anchor.
           */
          /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
          "Password must at least contain one uppercase letter, one lowercase letter, a digit, and a special character (!@#$&*)."
        ),
    })
    .required()
    .strip();
