import { auth } from "firebase-admin";
import { z } from "zod";
import { config, firebase } from "../providers";

export const getUpdateUserSchema = (uid = "") =>
  z
    .object({
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
    })
    .partial()
    .strip();

export const userSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .nonempty()
      .max(256)
      .regex(
        /^[a-zA-Z][a-zA-Z\-._ ]+[a-zA-Z]$/,
        "Must only contain alpha characters, whitespace, ., -, and _."
      ),
    lastName: z
      .string()
      .trim()
      .nonempty()
      .max(256)
      .regex(
        /^[a-zA-Z][a-zA-Z\-._ ]+[a-zA-Z]$/,
        "Must only contain alpha characters, whitespace, ., -, and _."
      ),
    password: z
      .string()
      .nonempty()
      .min(8, "Password must at least have 8 characters")
      .regex(
        /**
         * Explanation:
         * ^                         Start anchor
         * (?=.*[A-Z])        Ensure string has one uppercase letter.
         * (?=.*[!@#$&*])            Ensure string has one special case letter.
         * (?=.*[0-9])               Ensure string has one digit.
         * (?=.*[a-z])               Ensure string has one lowercase letter.
         * .{8,}                     Ensure string is at least a length of 8.
         * $                         End anchor.
         */
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
        "Password must at least contain one uppercase letter, one lowercase letter, a digit, and a special character (!@#$&*)."
      ),
  })
  .merge(getUpdateUserSchema().required())
  .required()
  .strip();