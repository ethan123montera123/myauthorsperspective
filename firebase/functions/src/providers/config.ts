import dotenv from "dotenv";
import {
  CorsConfig,
  FirebaseConfig,
  MailerConfig,
  StripeConfig,
} from "../interface";
import { envSchema } from "../validator";

const env = envSchema.parse(dotenv.config().parsed);

export const stripe = {
  SECRET_KEY: env.STRIPE_API_KEY,
  WEBHOOK_SECRET: env.STRIPE_WEBHOOK_SECRET,
  API_VERSION: "2022-11-15",
  CURRENCY: "USD",
  AUTOMATIC_PAYMENT_METHOD: true,
} as const satisfies StripeConfig;

export const firebase = {
  collections: {
    SERVICES: "services",
    ORDERS: "orders",
    USERS: "users",
  },
  options: {
    ENFORCE_APP_CHECK: true,
    FUNCTION_REGION: "asia-southeast1",
  },
} as const satisfies FirebaseConfig;

export const cors = {
  ORIGIN: env.FRONTEND_DEPLOYMENT_URL,
} as const satisfies CorsConfig;

export const mailer = {
  MAILER_EMAIL: `My Author's Perspective <${env.MAILER_EMAIL}>`,
  COMPANY_EMAIL: env.MAILER_COMPANY_EMAIL,
  API_KEY: env.MAILER_API_KEY,
} as const satisfies MailerConfig;
