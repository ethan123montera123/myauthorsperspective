import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

/**
 * @private
 *
 * @type {import("firebase/app").FirebaseOptions}
 * @readonly
 */
const config = Object.freeze({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PULIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

export const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app, "asia-southeast1");

if (process.env.NEXT_PUBLIC_NODE_ENV?.toLowerCase() !== "production") {
  const HOST = "127.0.0.1";
  const ports = Object.freeze({
    AUTH: 9099,
    FIRESTORE: 8080,
    FUNCTIONS: 5001,
  });

  connectAuthEmulator(auth, `http://${HOST}:${ports.AUTH}`);
  connectFirestoreEmulator(db, HOST, ports.FIRESTORE);
  connectFunctionsEmulator(functions, HOST, ports.FUNCTIONS);
}
