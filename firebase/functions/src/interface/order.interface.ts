import { Timestamp } from "firebase-admin/firestore";
import { Service } from "../providers/firebase/seeders/services";

type ArrayBaseType<T> = T extends (infer R)[] ? R : never;

export interface Order {
  services: OrderLine[];
  totalPrice: number;
  customerId: string;
  placedAt: Timestamp;
  paidAt: Timestamp | null;
  stripePaymentId: string;
}

export interface OrderLine extends Pick<Service, "title"> {
  title: Service["title"];
  inclusions: ArrayBaseType<Service["inclusions"]>["name"][];
  unitPrice: number;
  quantity: number;
}
