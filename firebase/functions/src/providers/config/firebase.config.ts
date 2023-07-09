import dotenv from "dotenv";
import { https } from "firebase-functions/v2";
import { envSchema } from "../../schemas";

export type FirestoreCollections = "orders" | "services" | "users";

export type FirestoreConfig = Readonly<{
  collections: Readonly<Record<Uppercase<FirestoreCollections>, string>>;
}>;

export type FunctionsConfig = Readonly<{
  options: Readonly<https.CallableOptions | https.HttpsOptions>;
}>;

export type AuthConfig = Readonly<{
  methods: Readonly<{
    isRecentLogin: (authTime: number) => boolean;
  }>;
}>;

export type FirebaseConfig = Readonly<{
  firestore: FirestoreConfig;
  functions: FunctionsConfig;
  auth: AuthConfig;
}>;

const env = envSchema.parse(dotenv.config().parsed);

export default Object.freeze({
  firestore: Object.freeze({
    collections: Object.freeze({
      SERVICES: "services",
      ORDERS: "orders",
      USERS: "users",
    }),
  }),
  functions: Object.freeze({
    options: Object.freeze({
      cors: env.FRONTEND_DEPLOYMENT_URL,
      enforceAppCheck: true,
      region: "asia-southeast1",
    }),
  }),
  auth: Object.freeze({
    methods: Object.freeze({
      /**
       * Checks whether the auth time is within the range of
       * what is considered a recent login. (By default a login
       * is recent if it's below or equal to `15 mins`).
       *
       * @param authTime The time the user was authenticated.
       * @return
       * Returns a boolean value of `true` if the user
       * was recently logged in, otherwise `false`.
       */
      isRecentLogin: (authTime: number) => {
        const diff = Date.now() - authTime * 1000;
        const maxRecentLoginTime = 15 * 60 * 1000; // 15 mins in milliseconds

        return diff <= maxRecentLoginTime;
      },
    }),
  }),
}) satisfies FirebaseConfig;
