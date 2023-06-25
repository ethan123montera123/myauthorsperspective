import { Resend } from "resend";
import { mailer as mailerConfig } from "./config";

export const mailer = new Resend(mailerConfig.API_KEY);
