import { z } from "zod";

export const DEFAULT_FRONTEND_URL = "http://localhost:3000";

export const envSchema = z
  .object({
    STRIPE_API_KEY: z.string().trim(),
    STRIPE_WEBHOOK_SECRET: z.string().trim(),

    MAILER_API_KEY: z.string().trim(),
    MAILER_EMAIL: z.string().trim(),
    MAILER_COMPANY_EMAIL: z.string().trim(),

    BACKEND_ENV: z
      .enum(["production", "development"])
      .default("development")
      .optional(),
    FRONTEND_DEPLOYMENT_URL: z
      .string()
      .trim()
      .optional()
      .default(DEFAULT_FRONTEND_URL)
      .transform((str) => {
        const urls = str.split(/\s+/);
        return urls.length > 1 ? urls : str;
      }),
  })
  .required()
  .transform(({ ...args }) => ({
    CORS_ORIGIN:
      args.BACKEND_ENV === "production"
        ? args.FRONTEND_DEPLOYMENT_URL
        : DEFAULT_FRONTEND_URL,
    ...args,
  }));
