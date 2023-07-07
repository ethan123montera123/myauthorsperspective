export type FirestoreCollections = "orders" | "services" | "users";

export interface FirebaseConfig {
  collections: Record<Uppercase<FirestoreCollections>, string>;
  options: {
    ENFORCE_APP_CHECK: boolean;
    FUNCTION_REGION: string;
  };
  methods: {
    isRecentLogin: (authTime: number) => boolean;
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
  ORIGIN: string | string[];
}

export interface MailerConfig {
  MAILER_EMAIL: string;
  COMPANY_EMAIL: string;
  API_KEY: string;
}
