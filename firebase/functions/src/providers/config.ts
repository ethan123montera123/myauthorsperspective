import dotenv from "dotenv";
import { Config } from "../interface";

const { parsed: env } = dotenv.config();

const config = {
  stripe: {
    secretKey: env?.STRIPE_API_KEY || "",
    webhookSecret: env?.STRIPE_WEBHOOK_SECRET || "",
    apiVersion: "2022-11-15",
  },
  firebase: {
    collectionPaths: {
      services: "services",
      users: "users",
    },
  },
} as const satisfies Config;

export default config;
