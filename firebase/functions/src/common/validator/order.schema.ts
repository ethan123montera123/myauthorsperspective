import { z } from "zod";
import {
  PopulatedService,
  Service,
  ServiceOrder,
  ServiceTierInfo,
} from "../interface";
import { config, firebase } from "../providers";

/**
 * The general data format of the data received from the client.
 */
const orderSkeleton = z.object({
  service: z.string(),
  inclusions: z
    .number()
    .min(1, "Invalid inclusion ID.")
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
  { quantity = 1, inclusions = [], service }: z.infer<typeof orderSkeleton>,
  ctx: z.RefinementCtx
): Promise<PopulatedService> {
  const snapshot = await firebase.db
    .collection(config.firebase.collections.SERVICES)
    .doc(service)
    .get();

  const data = snapshot.data() as Service;
  if (!data) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid service ID.",
      path: ["service"],
    });

    return z.NEVER;
  }

  const dedupedInclusions = new Set(inclusions);
  const populatedInclusions = data.inclusions.filter(({ id }) =>
    dedupedInclusions.has(id)
  );

  // If the mappedInclusions does not match the length of the non-mapped one
  // Then there must be a non-existent ID passed in, and we should throw an error.
  if (populatedInclusions.length !== dedupedInclusions.size) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Inclusions contain an invalid ID.",
      path: ["inclusions"],
    });

    return z.NEVER;
  }

  return {
    title: data.title,
    priceTier: data.priceTier,
    inclusions: populatedInclusions,
    quantity,
  };
}

/**
 * Converts the populated service into a consumable service order
 * containing only the necessary data for storing and placing orders.
 *
 * @param service  The populated service to be converted to a consumable service order.
 */
async function toServiceOrder({
  quantity,
  inclusions,
  priceTier,
  title,
}: PopulatedService): Promise<ServiceOrder> {
  // Pricing is based upon the price of the highest tier based on
  // the inclusions' tier. If there are no inclusions selected,
  // then it defaults to the price defaults.
  const uniqueTiers = new Set(inclusions.map(({ tier }) => tier));

  let info: ServiceTierInfo = priceTier[priceTier.default]!;
  for (const tier of uniqueTiers) {
    if (priceTier[tier]!.level > info.level) {
      info = priceTier[tier]!;
    }
  }

  return {
    title: title,
    unitPrice: info.price,
    inclusions: inclusions.map(({ name }) => name),
    quantity,
  };
}

/**
 * Validator and populator for an order schema.
 */
export const orderSchema = orderSkeleton
  .strip()
  .transform(toPopulatedOrderSchema)
  .transform(toServiceOrder)
  .array()
  .nonempty("Order must contain at least 1 or more services.");
