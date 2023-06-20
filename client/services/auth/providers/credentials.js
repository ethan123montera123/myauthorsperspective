import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { parseThrowablesToObject } from "@/services/common";
import { auth, collections, db } from "@/services/firebase";

/**
 * Signs in a user with an email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @return {ObjectWithError<import("firebase/auth").User>} An object containing the authenticated user
 * information and an error object.
 * @example
 * ```js
 * const { data, error } = await signInWithCredentials("john@smith.com", "Abcd1234!");
 * if(!error) // handle data
 * else       // handle error
 * ```
 */
export async function signInWithCredentials(email, password) {
  return parseThrowablesToObject(async () => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  });
}

/**
 * Signs up a user.
 *
 * @param {import("../../common/types").UserSignUpDto} user An object containing the user's information.
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
 * const { data, error } = await signUpWithCredentials(user);
 * if(!error) // handle data
 * else       // handle error
 * ```
 */
export async function signUpWithCredentials(user) {
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
