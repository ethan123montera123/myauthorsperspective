import { render } from "@react-email/components";
import { HttpsError } from "firebase-functions/v1/auth";
import { https } from "firebase-functions/v2";

import { ContactEmail } from "../emails";
import { config, logger, mailer } from "../providers";
import { contactSchema, parseErrors } from "../schemas";

export const sendContactEmail = https.onCall(
  config.firebase.functions.options,
  async (req) => {
    const result = contactSchema.safeParse(req.data);
    if (!result.success) {
      throw new HttpsError(
        "invalid-argument",
        "Contact contains invalid values.",
        parseErrors(result.error.issues)
      );
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

      return { msg: "Successfully sent contact email." };
    } catch (err) {
      logger.error("Sending contact email failed.", err, result.data);
      throw new HttpsError(
        "internal",
        "An error occurred whilst sending contact email."
      );
    }
  }
);
