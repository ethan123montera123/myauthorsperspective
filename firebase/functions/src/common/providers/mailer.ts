import sendgrid from "@sendgrid/mail";
import { mailer as mailerConfig } from "./config";

sendgrid.setApiKey(mailerConfig.API_KEY);

export const mailer = sendgrid;
