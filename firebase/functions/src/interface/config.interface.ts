export type FirestoreCollections = "services" | "users";

export interface FirebaseConfig {
  collections: Record<Uppercase<FirestoreCollections>, string>;
}

export interface StripeConfig {
  SECRET_KEY: string;
  WEBHOOK_SECRET: string;
  API_VERSION: string;
}

export interface CorsConfig {
  ORIGIN: string;
}
