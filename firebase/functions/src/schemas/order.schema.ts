import { FieldPath } from "firebase-admin/firestore";
import { z } from "zod";
import { Order, OrderLine, Service } from "../@types";
import { config, firebase } from "../providers";

/**
 * Calculates the pricing of a service based on the highest inclusion tier that it has.
 *
 * Note:
 * Pricing is based upon the price of the highest tier based on
 * the inclusions' tier. If there are no inclusions selected,
 * then it defaults to the price defaults.
 *
 * @param service The service whose price is to be calculated.
 * @returns       The pricing of the service based on the highest inclusion tier.
 */
function calculateServicePrice({
  inclusions,
  priceTier,
}: Pick<Service, "inclusions" | "priceTier">): number {
  const DEFAULT_TIER = { level: -1, price: 0 };
  const uniqueTiers = new Set(inclusions.map(({ tier }) => tier));

  let highestTier = priceTier[priceTier.default] ?? DEFAULT_TIER;
  let currentTier = DEFAULT_TIER;
  for (const tier of uniqueTiers) {
    currentTier = priceTier[tier] ?? DEFAULT_TIER;

    if (currentTier.level > highestTier.level) {
      highestTier = currentTier;
    }
  }

  return highestTier.price;
}

/**
 * Calculates the total price of the order.
 *
 * @param services The array of services part of the order.
 * @return         The total price of the order.
 */
function calculateOrderTotal(services: OrderLine[]): number {
  return services.reduce(function (total, { quantity, unitPrice }) {
    return total + quantity * unitPrice;
  }, 0);
}

export const orderSchema = z
  .object({
    service: z.string().trim().nonempty(),
    inclusions: z
      .number()
      .min(1, "Invalid inclusion ID.")
      .array()
      .default([])
      .optional(),
  })
  .strip()
  .array()
  .nonempty("Order must contain at least 1 or more services.")
  .refine(
    (services) => {
      const uniqueServices = new Set(services.map(({ service }) => service));
      return uniqueServices.size === services.length;
    },
    {
      message: "There should be no duplicate services in a single order.",
      path: ["order"],
    }
  )
  .transform(
    async (services, ctx): Promise<Pick<Order, "services" | "totalPrice">> => {
      const servicesQuery = firebase.db
        .collection(config.firebase.firestore.collections.SERVICES)
        .where(
          FieldPath.documentId(),
          "in",
          services.map(({ service }) => service)
        );

      const query = await servicesQuery.count().get();
      if (query.data().count !== services.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Services contain an invalid ID.",
          path: ["order"],
        });

        return z.NEVER;
      }

      // Convert services into a hash-map for easier querying later on
      const snapshot = await servicesQuery.get();
      const dbServices: Record<string, Service> = snapshot.docs.reduce(
        (acc, doc) => ({
          ...acc,
          [doc.id]: doc.data() as Service,
        }),
        {}
      );

      // Populate the services with the database data
      const populatedServices = services.map(
        ({ service, inclusions }, idx): OrderLine => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const data = dbServices[service]!;

          const uniqueIncl = new Set(inclusions);
          const populatedIncl = data.inclusions.filter(({ id }) =>
            uniqueIncl.has(id)
          );

          // If the mappedInclusions does not match the length of the non-mapped one
          // Then there must be a non-existent ID passed in, and we should throw an error.
          if (populatedIncl.length !== uniqueIncl.size) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Inclusions contain an invalid ID.",
              path: [idx, "inclusions"],
            });

            return z.NEVER;
          }

          return {
            title: data.title,
            unitPrice: calculateServicePrice({
              priceTier: data.priceTier,
              inclusions: populatedIncl,
            }),
            inclusions: populatedIncl.map(({ name }) => name),

            // Placeholder property, leftover from previous implementations
            // of a bulk order. I'm keeping this here, just in case business
            // requirements change it would be easy to extend functionality
            // to include quantity since all the logic is in place.
            quantity: 1,
          };
        }
      );

      return {
        services: populatedServices,
        totalPrice: calculateOrderTotal(populatedServices),
      };
    }
  );
