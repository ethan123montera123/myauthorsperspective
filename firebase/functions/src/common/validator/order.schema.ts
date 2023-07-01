import { z } from "zod";
import { ServiceOrder } from "../interface";
import { config, firebase } from "../providers";

/**
 * The general data format of the data received from the client.
 */
const orderSkeleton = z.object({
  service: z.string(),
  inclusions: z
    .number()
    .min(0, "Invalid inclusion ID.")
    .array()
    .default([])
    .optional(),
  quantity: z
    .number()
    .min(1, "The minimum quantity that can be ordered for a service is 1.")
    .optional()
    .default(1),
});

/**
 * Populates the skeleton which just contians string and number IDs,
 * to their actual values from the database.
 *
 * @param skeleton The order skeleton to be populated.
 * @param ctx      The validation execution context.
 */
async function toPopulatedOrderSchema(
  { quantity, inclusions = [], service }: z.infer<typeof orderSkeleton>,
  ctx: z.RefinementCtx
): Promise<ServiceOrder> {
  const snapshot = await firebase.db
    .collection(config.firebase.collections.SERVICES)
    .doc(service)
    .get();

  const data = snapshot.data();
  if (!data) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid service ID.",
      path: ["service"],
    });

    return z.NEVER;
  }

  // IDs of inclusions are there indices, and we want their names.
  // There is a possibility that the ID passed is not a valid inclusion
  // thus we must filter it.
  const dedupedInclusions = [...new Set(inclusions)];
  const populatedInclusions = dedupedInclusions
    .map((id) => data.inclusions[id])
    .filter(Boolean);

  // If the mappedInclusions does not match the length of the non-mapped one
  // Then there must be a non-existent ID passed in, and we should throw an error.
  if (populatedInclusions.length !== dedupedInclusions.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Inclusions contain an invalid ID.",
      path: ["inclusions"],
    });

    return z.NEVER;
  }

  return {
    title: data.title,
    unitPrice: data.unitPrice,
    inclusions: populatedInclusions,
    quantity,
  };
}

/**
 * Validator and populator for an order schema.
 */
export const orderSchema = orderSkeleton
  .strip()
  .transform(toPopulatedOrderSchema)
  .array()
  .nonempty("Order must contain at least 1 or more services.");
