import { render } from "@react-email/components";
import { HttpsError } from "firebase-functions/v1/auth";
import { https } from "firebase-functions/v2";

import ContactEmail from "../common/emails/ContactEmail";
import { config, logger, mailer } from "../common/providers";
import { contactSchema } from "../common/validator";

export const sendContactEmail = https.onCall(
  {
    cors: config.cors.ORIGIN,
    enforceAppCheck: config.firebase.options.ENFORCE_APP_CHECK,
  },
  async (req) => {
    const result = contactSchema.safeParse(req.data);
    if (!result.success) {
      throw new HttpsError("invalid-argument", result.error.message);
    }

    logger.log("Creating contact email...", result.data);

    try {
      // eslint-disable-next-line new-cap
      const email = ContactEmail(result.data);

      await mailer.send({
        from: config.mailer.MAILER_EMAIL,
        to: config.mailer.COMPANY_EMAIL,
        subject: result.data.subject,
        html: render(email),
      });

      logger.log("Contact email sent.", result.data);
      return;
    } catch (err) {
      logger.error("Sending contact email failed.", err, result.data);
      throw new HttpsError(
        "internal",
        "An error occurred whilst sending contact email."
      );
    }
  }
);
