import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, collections, db } from "@/services/firebase";

/**
 * Signs in a user with an email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @return {Promise<import("firebase/auth").UserCredential>} A promise containing the authenticated user's
 * credentials.
 * @example
 * ```js
 * try {
 *  const credentials = await signInWithCredentials(user);
 *  // handle data
 * } catch (error) {
 *  // handle error
 * }
 * ```
 */
export async function signInWithCredentials(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

/**
 * Signs up a user.
 *
 * @param {import("../../common/types").UserSignUpDto} user - An object containing the user's information.
 * @return {Promise<import("firebase/auth").UserCredential>} A promise containing the signed up user's
 * auth credentials.
 * @example
 * ```js
 * const user = {
 *  firstName: "John"
 *  lastName: "Smith"
 *  phone: "091234567890"
 *  email: "john@smith.com"
 *  password: "Abcd1234!"
 * };
 *
 * try {
 *  const credentials = await signUpWithCredentials(user);
 *  // handle data
 * } catch (error) {
 *  // handle error
 * }
 * ```
 */
export async function signUpWithCredentials(user) {
  const { password, ...dto } = user;

  const { user: createdUser } = await createUserWithEmailAndPassword(
    auth,
    dto.email,
    password
  );

  await setDoc(doc(db, collections.USERS, createdUser.uid), {
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    phone: dto.phone,
  });

  return createdUser;
}
