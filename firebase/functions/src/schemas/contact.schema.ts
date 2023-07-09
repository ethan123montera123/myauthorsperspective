import { z } from "zod";
import { getUserSchema } from "./user.schema";

export const contactSchema = z
  .object({
    email: z.string().trim().nonempty().email(),
    subject: z.string().trim().nonempty().max(256),
    message: z.string().trim().nonempty(),
  })
  .merge(getUserSchema().pick({ firstName: true, lastName: true }))
  .strip()
  .required()
  .transform(({ firstName, lastName, ...rest }) => ({
    name: (firstName + " " + lastName).trim(),
    ...rest,
  }));
