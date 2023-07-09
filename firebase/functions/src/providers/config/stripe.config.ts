import dotenv from "dotenv";
import { envSchema } from "../../schemas";

export type StripeConfig = Readonly<{
  SECRET_KEY: string;
  WEBHOOK_SECRET: string;
  API_VERSION: string;
  CURRENCY: string;
  AUTOMATIC_PAYMENT_METHOD: boolean;
}>;

const env = envSchema.parse(dotenv.config().parsed);

export default Object.freeze({
  SECRET_KEY: env.STRIPE_API_KEY,
  WEBHOOK_SECRET: env.STRIPE_WEBHOOK_SECRET,
  API_VERSION: "2022-11-15",
  CURRENCY: "USD",
  AUTOMATIC_PAYMENT_METHOD: true,
}) satisfies StripeConfig;
