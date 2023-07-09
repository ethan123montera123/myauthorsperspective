import { https } from "firebase-functions/v2";

export type FirestoreCollections = "orders" | "services" | "users";

export interface FirestoreConfig {
  collections: Record<Uppercase<FirestoreCollections>, string>;
}

export interface FunctionsConfig {
  options: https.CallableOptions | https.HttpsOptions;
}

export interface AuthConfig {
  methods: {
    isRecentLogin: (authTime: number) => boolean;
  };
}

export interface FirebaseConfig {
  firestore: FirestoreConfig;
  functions: FunctionsConfig;
  auth: AuthConfig;
}

export interface StripeConfig {
  SECRET_KEY: string;
  WEBHOOK_SECRET: string;
  API_VERSION: string;
  CURRENCY: string;
  AUTOMATIC_PAYMENT_METHOD: boolean;
}

export interface MailerConfig {
  MAILER_EMAIL: string;
  COMPANY_EMAIL: string;
  API_KEY: string;
}
