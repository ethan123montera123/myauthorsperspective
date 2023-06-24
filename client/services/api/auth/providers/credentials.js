import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, collections, db } from "@/services/firebase";
import { pick, verifyAuthLogon } from "@/services/utils";
import { FirebaseError } from "firebase/app";

/**
 * Signs in a user with an email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @return {Promise<import("firebase/auth").UserCredential>} A promise containing the authenticated user's
 * credentials.
 * @example
 * try {
 *  const credentials = await signInWithCredentials(user);
 *  // handle data
 * } catch (error) {
 *  // handle error
 * }
 */
export async function signInWithCredentials(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

/**
 * Reauthenticate the currently logged in user with their password.
 *
 * @param {string} password - The user's password.
 * @return {Promise<import("firebase/auth").UserCredential>} A promise containing the signed up user's
 * auth credentials.
 * @remarks
 * Use before sensitive operations such as `updateAuthAccount`, and `changePassword`.
 * @example
 * try {
 *  const credentials = await reauthenticateWithCredentials(password);
 *  await updateAuthAccount({ email, phone });
 *  // handle data
 * } catch (error) {
 *  // handle error
 * }
 */
export async function reauthenticateWithCredentials(password) {
  verifyAuthLogon(auth);

  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    password
  );

  return reauthenticateWithCredential(auth.currentUser, credential);
}

/**
 * Signs up a user with email and password.
 *
 * @param {import("../../@types").UserSignUpDto} user - An object containing the user's information.
 * @return {Promise<import("firebase/auth").UserCredential>} A promise containing the signed up user's
 * auth credentials.
 * @example
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
 */
export async function signUpWithCredentials(user) {
  const { password, ...dto } = user;

  // TODO: Add email verification
  const credential = await createUserWithEmailAndPassword(
    auth,
    dto.email,
    password
  );

  try {
    const payload = pick(user, "firstName", "lastName", "email", "phone");
    const docRef = doc(db, collections.USERS, credential.user.uid);
    await setDoc(docRef, payload);
  } catch (err) {
    // Roll back if a validation error occurs in setting document
    await credential.user.delete();
    throw new FirebaseError(err.code, err.message, err.customData);
  }

  // TODO: Send Email Verification
  return credential;
}
