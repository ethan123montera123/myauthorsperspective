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
  methods: {
    /**
     * Checks whether the auth time is within the range of
     * what is considered a recent login. (By default a login
     * is recent if it's below or equal to `15 mins`).
     *
     * @param authTime The time the user was authenticated.
     * @return
     * Returns a boolean value of `true` if the user
     * was recently logged in, otherwise `false`.
     */
    isRecentLogin: (authTime: number = 0) => {
      const diff = Date.now() - authTime * 1000;
      const maxRecentLoginTime = 15 * 60 * 1000; // 15 mins in milliseconds

      return diff <= maxRecentLoginTime;
    },
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
