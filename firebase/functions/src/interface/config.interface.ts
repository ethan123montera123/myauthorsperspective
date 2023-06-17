export interface Config {
  stripe: StripeConfig;
  firebase: FirebaseConfig;
}

export interface StripeConfig {
  secretKey: string;
  webhookSecret: string;
}

export interface FirebaseConfig {
  collectionPaths: Record<Collections, string>;
  options?: {
    sync?: Partial<
      Record<Collections, Partial<Record<Exclude<Methods, "view">, boolean>>>
    >;
  };
}

export type Methods = "view" | "create" | "update" | "delete";
export type Collections = "services" | "customers";
