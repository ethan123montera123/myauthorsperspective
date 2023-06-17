export interface Config {
  stripe: StripeConfig;
  firebase: FirebaseConfig;
}

export interface StripeConfig {
  secretKey: string;
  webhookSecret: string;
  apiVersion: string;
}

export interface FirebaseConfig {
  collectionPaths: Record<Collections, string>;
}

export type Collections = "services" | "users";
