import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, collections, db } from "@/services/firebase";
import {
  ObjectWithError,
  parseThrowablesToObject,
  pick,
  verifyAuthLogon,
} from "@/services/utils";

/**
 * Signs in a user with an email and password.
 *
 * @param   {string}  email     The user's email address.
 * @param   {string}  password  The user's password.
 * @return  {Promise<ObjectWithError<import("firebase/auth").UserCredential, import("firebase/app").FirebaseError>>}
 * A promise containing the user's credentials, and a possible error.
 * @example
 * const { data: credentials, error } = await signInWithCredentials(user);
 * if(error) {
 *  if(error instanceof FirebaseError) // handle firebase errors
 *  else // handle general errors
 * }
 *
 * // handle credentials
 */
export async function signInWithCredentials(email, password) {
  return parseThrowablesToObject(() => {
    return signInWithEmailAndPassword(auth, email, password);
  });
}

/**
 * Reauthenticate the currently logged in user with their password.
 *
 * @param   {string}  password  The user's password.
 * @return  {Promise<ObjectWithError<import("firebase/auth").UserCredential, import("firebase/app").FirebaseError>>}
 * A promise containing the user's reauthenticated credentials, and a possible error.
 *
 * @remarks
 * Use before sensitive operations such as `updateAuthAccount`, and `changePassword`,
 * if the user has been logged in for too long.
 *
 * @example
 * const { error: reauthError } = await reauthenticateWithCredentials(password);
 * if(reauthError) { // handle reauthentication errors
 *  if(reauthError instanceof FirebaseError) // handle firebase errors
 *  else // handle general errors
 * }
 *
 * const { error } = await updateAuthAccount({ email, phone });
 * if(error) { // handle update errors
 *  if (error instanceof FirebaseError) // handle other FirebaseError for update account
 *  else // handle general errors
 * }
 */
export async function reauthenticateWithCredentials(password) {
  return parseThrowablesToObject(() => {
    verifyAuthLogon(auth);

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );

    return reauthenticateWithCredential(auth.currentUser, credential);
  });
}

/**
 * Signs up a user with email and password.
 *
 * @param   {import("../../@types").UserSignUpDto}  user  An object containing the user's information.
 * @return  {Promise<ObjectWithError<import("firebase/auth").UserCredential, import("firebase/app").FirebaseError>>}
 * A promise containing the user's credentials, and a possible error.
 *
 * @example
 * const user = {
 *  firstName: "John"
 *  lastName: "Smith"
 *  phone: "091234567890"
 *  email: "john@smith.com"
 *  password: "Abcd1234!"
 * };
 *
 * const { data: credentials, error } = await signUpWithCredentials(user);
 * if(error) {
 *  if(error instanceof FirebaseError) // handle firebase errors
 *  else // handle general errors
 * }
 *
 * // handle credentials
 */
export async function signUpWithCredentials(user) {
  return parseThrowablesToObject(async () => {
    const { password, ...dto } = user;

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
      // Roll back created auth account
      // if a validation error occurs in setting document
      await credential.user.delete();
      throw new FirebaseError(err.code, err.message, err.customData);
    }

    // TODO: Send Email Verification
    return credential;
  });
}
