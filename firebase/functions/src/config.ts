import dotenv from "dotenv";
import { Config } from "./interface";

const { parsed: env } = dotenv.config();

const config: Config = {
  stripe: {
    secretKey: env?.STRIPE_API_KEY || "",
    webhookSecret: env?.STRIPE_WEBHOOK_SECRET || "",
  },
  firebase: {
    collectionPaths: {
      services: "services",
      customers: "customers",
    },
  },
};

export default config;
