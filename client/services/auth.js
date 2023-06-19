import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, collections, db } from "./firebase";
import { parseThrowablesToObject } from "./utils";

/**
 * Signs in a user with an email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @return {ObjectWithError<import("firebase/auth").User>} An object containing the authenticated user
 * information and an error object.
 * @example
 * ```js
 * const { data, error } = await signIn("john@smith.com", "Abcd1234!");
 * if(!error) // handle data
 * else       // handle error
 * ```
 */
export async function signIn(email, password) {
  return parseThrowablesToObject(async () => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  });
}

/**
 * Signs up a user.
 *
 * @param {import("@/services/types").UserSignUpDto} user An object containing the user's information.
 * @return {ObjectWithError<import("firebase/auth").User>} An object containing the authenticated user
 * information and an error object.
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
 * const { data, error } = await signUp(user);
 * if(!error) // handle data
 * else       // handle error
 * ```
 */
export async function signUp(user) {
  return parseThrowablesToObject(async () => {
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
  });
}

/**
 * Signs out the currently logged in user.
 *
 * @returns {ObjectWithError<void>}
 */
export async function signOut() {
  return parseThrowablesToObject(() => auth.signOut());
}

/**
 * Gets the profile of the currently authenticated user.
 *
 * @returns {ObjectWithError<import("@/services/types").User>} An object containing the
 * authenticated user's profile and an error object.
 * @example
 * ```js
 * const { data, error } = await getProfile();
 * if(!error) // handle data
 * else       // handle error
 * ```
 */
export async function getProfile() {
  return parseThrowablesToObject(async () => {
    if (!auth.currentUser)
      throw new FirebaseError(
        "auth/no-user-logon",
        "No user is currently logged in."
      );

    const snapshot = await getDoc(
      doc(db, collections.USERS, auth.currentUser.uid)
    );

    return snapshot.data();
  });
}

// TODO: Change Password
// TODO: Update Profile (email and phone only)
