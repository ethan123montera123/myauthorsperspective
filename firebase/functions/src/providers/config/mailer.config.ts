import dotenv from "dotenv";
import { envSchema } from "../../schemas";

export type MailerConfig = Readonly<{
  MAILER_EMAIL: string;
  COMPANY_EMAIL: string;
  API_KEY: string;
}>;

const env = envSchema.parse(dotenv.config().parsed);

export default Object.freeze({
  MAILER_EMAIL: `My Author's Perspective <${env.MAILER_EMAIL}>`,
  COMPANY_EMAIL: env.MAILER_COMPANY_EMAIL,
  API_KEY: env.MAILER_API_KEY,
}) satisfies MailerConfig;
