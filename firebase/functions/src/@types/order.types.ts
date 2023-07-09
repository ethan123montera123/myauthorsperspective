import { Timestamp } from "firebase-admin/firestore";
import { Service } from "./service.types";

type ArrayBaseType<T> = T extends (infer R)[] ? R : never;

export type OrderLine = {
  title: Service["title"];
  inclusions: ArrayBaseType<Service["inclusions"]>["name"][];
  unitPrice: number;
  quantity: number;
};

export type Order = {
  services: OrderLine[];
  totalPrice: number;
  customerId: string;
  placedAt: Timestamp;
  paidAt: Timestamp | null;
  stripePaymentId: string;
};
