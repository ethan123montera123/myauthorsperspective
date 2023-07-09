import { https } from "firebase-functions/v2";

export type FirestoreCollections = "orders" | "services" | "users";

export type FirestoreConfig = {
  collections: Record<Uppercase<FirestoreCollections>, string>;
};

export type FunctionsConfig = {
  options: https.CallableOptions | https.HttpsOptions;
};

export type AuthConfig = {
  methods: {
    isRecentLogin: (authTime: number) => boolean;
  };
};

export type FirebaseConfig = {
  firestore: FirestoreConfig;
  functions: FunctionsConfig;
  auth: AuthConfig;
};

export type StripeConfig = {
  SECRET_KEY: string;
  WEBHOOK_SECRET: string;
  API_VERSION: string;
  CURRENCY: string;
  AUTOMATIC_PAYMENT_METHOD: boolean;
};

export type MailerConfig = {
  MAILER_EMAIL: string;
  COMPANY_EMAIL: string;
  API_KEY: string;
};
