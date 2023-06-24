import dotenv from "dotenv";
import { CorsConfig, FirebaseConfig, StripeConfig } from "../interface";

const { parsed: env } = dotenv.config();

export const stripe = {
  SECRET_KEY: env?.STRIPE_API_KEY || "",
  WEBHOOK_SECRET: env?.STRIPE_WEBHOOK_SECRET || "",
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
} as const satisfies FirebaseConfig;

export const cors = {
  ORIGIN: env?.CORS_ORIGIN || "http://localhost:3000",
} as const satisfies CorsConfig;
