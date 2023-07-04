import { z } from "zod";

export const DEFAULT_FRONTEND_URL = "http://localhost:3000";

export const envSchema = z
  .object({
    STRIPE_API_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),

    MAILER_API_KEY: z.string(),
    MAILER_EMAIL: z.string(),
    MAILER_COMPANY_EMAIL: z.string(),

    BACKEND_ENV: z
      .enum(["production", "development"])
      .default("development")
      .optional(),
    FRONTEND_DEPLOYMENT_URL: z
      .string()
      .default(DEFAULT_FRONTEND_URL)
      .optional(),
  })
  .required()
  .transform((args) => ({
    CORS_ORIGIN:
      args.BACKEND_ENV === "production"
        ? args.FRONTEND_DEPLOYMENT_URL
        : DEFAULT_FRONTEND_URL,
    ...args,
  }));
