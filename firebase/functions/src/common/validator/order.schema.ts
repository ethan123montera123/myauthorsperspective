import { z } from "zod";
import { OrderLine, Service } from "../interface";
import { config, firebase } from "../providers";

/**
 * The general data format of the data received from the client.
 */
const orderSkeleton = z.object({
  service: z.string().nonempty(),
  inclusions: z
    .number()
    .min(1, "Invalid inclusion ID.")
    .array()
    .default([])
    .optional(),
});

/**
 * Populates the skeleton which just contians string and number IDs,
 * to their actual values from the database.
 *
 * @param skeleton The order skeleton to be populated.
 * @param ctx      The validation execution context.
 */
async function toPopulatedOrderSchema(
  { inclusions = [], service }: z.infer<typeof orderSkeleton>,
  ctx: z.RefinementCtx
): Promise<Service & { quantity: number }> {
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

  const uniqueIncl = new Set(inclusions);
  const populatedIncl = data.inclusions.filter(({ id }) => uniqueIncl.has(id));

  // If the mappedInclusions does not match the length of the non-mapped one
  // Then there must be a non-existent ID passed in, and we should throw an error.
  if (populatedIncl.length !== uniqueIncl.size) {
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
    inclusions: populatedIncl,

    // Placeholder property, leftover from previous implementations
    // of a bulk order. I'm keeping this here, just in case business
    // requirements change it would be easy to extend functionality
    // to include quantity since all the logic is in place.
    quantity: 1,
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
}: Service & { quantity: number }): Promise<OrderLine> {
  // Pricing is based upon the price of the highest tier based on
  // the inclusions' tier. If there are no inclusions selected,
  // then it defaults to the price defaults.
  const uniqueTiers = new Set(inclusions.map(({ tier }) => tier));

  const DEFAULT_TIER = { level: -1, price: 0 };
  let highestTier = priceTier[priceTier.default] ?? DEFAULT_TIER;
  let currentTier = DEFAULT_TIER;
  for (const tier of uniqueTiers) {
    currentTier = priceTier[tier] ?? DEFAULT_TIER;

    if (currentTier.level > highestTier.level) {
      highestTier = currentTier;
    }
  }

  return {
    title,
    unitPrice: highestTier.price,
    inclusions: inclusions.map(({ name }) => name),
    quantity,
  };
}

/**
 * Checks whether there are duplicate services in the transaction.
 *
 * @param services The array of services.
 * @return `True` if there are no duplicate services, otherwise `false`.
 */
async function checkForDuplicateServices(services: OrderLine[]) {
  const uniqueServices = new Set(services.map(({ title }) => title));

  return uniqueServices.size === services.length;
}

/**
 * Calculates the total price of the order.
 *
 * @param services The array of services.
 * @return An object containing the services and their total price.
 */
async function calculateOrderTotal(services: OrderLine[]) {
  const total = services.reduce(function (total, { quantity, unitPrice }) {
    return total + quantity * unitPrice;
  }, 0);

  return {
    services,
    totalPrice: total,
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
  .nonempty("Order must contain at least 1 or more services.")
  .refine(checkForDuplicateServices, {
    message:
      "There should be no duplicate services of the same type in a single order.",
    path: ["order"],
  })
  .transform(calculateOrderTotal);
