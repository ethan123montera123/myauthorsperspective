import dotenv from "dotenv";
import { FirebaseConfig, StripeConfig } from "../interface";

const { parsed: env } = dotenv.config();

export const stripe = {
  secretKey: env?.STRIPE_API_KEY || "",
  webhookSecret: env?.STRIPE_WEBHOOK_SECRET || "",
  apiVersion: "2022-11-15",
} as const satisfies StripeConfig;

export const firebase = {
  collectionPaths: {
    services: "services",
    users: "users",
  },
} as const satisfies FirebaseConfig;
