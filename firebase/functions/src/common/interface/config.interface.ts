export type FirestoreCollections = "orders" | "services" | "users";

export interface FirebaseConfig {
  collections: Record<Uppercase<FirestoreCollections>, string>;
  options: {
    ENFORCE_APP_CHECK: boolean;
  };
}

export interface StripeConfig {
  SECRET_KEY: string;
  WEBHOOK_SECRET: string;
  API_VERSION: string;
  CURRENCY: string;
  AUTOMATIC_PAYMENT_METHOD: boolean;
}

export interface CorsConfig {
  ORIGIN: string;
}

export interface MailerConfig {
  API_KEY: string;
}
