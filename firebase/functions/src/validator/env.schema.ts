import { z } from "zod";

export const envSchema = z
  .object({
    STRIPE_API_KEY: z.string().trim(),
    STRIPE_WEBHOOK_SECRET: z.string().trim(),

    MAILER_API_KEY: z.string().trim(),
    MAILER_EMAIL: z.string().trim(),
    MAILER_COMPANY_EMAIL: z.string().trim(),

    FRONTEND_DEPLOYMENT_URL: z
      .string()
      .trim()
      .optional()
      .default("http://localhost:3000")
      .transform((str) => {
        const urls = str.split(/\s+/);
        return urls.length > 1 ? urls : str;
      }),
  })
  .required();
