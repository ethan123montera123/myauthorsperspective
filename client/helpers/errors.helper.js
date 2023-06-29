const _firebaseErrorCodeMessages = {
  "invalid-argument": "An input field is missing.",
  "auth/email-already-in-use": "An account with that email already exists.",
  "auth/invalid-email": "Invalid email or password.",
  "auth/wrong-password": "Invalid email or password.",
};

/**
 *
 * @param {string} errorCode the FirebaseError.code string that distinguishes an error type
 * @returns a string meant to be displayed to the UI for users
 */
export const prettyPrintFirebaseError = (errorCode) => {
  return _firebaseErrorCodeMessages[errorCode];
};
