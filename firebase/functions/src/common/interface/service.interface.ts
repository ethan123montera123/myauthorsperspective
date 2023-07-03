export type PriceTier = "basic" | "premium";

export interface ServiceTierInfo {
  level: number;
  price: number;
}

export interface ServiceInclusion<T extends string> {
  id: number;
  tier: T;
  name: string;
}

export interface Service<T extends string = PriceTier> {
  title: string;
  priceTier: { default: T } & Partial<Record<T, ServiceTierInfo>>;
  inclusions: ServiceInclusion<T>[];
}

export interface PopulatedService<T extends string = PriceTier>
  extends Service<T> {
  quantity: number;
}

export interface ServiceOrder
  extends Pick<PopulatedService, "title" | "quantity"> {
  unitPrice: number;
  inclusions: ServiceInclusion<PriceTier>["name"][];
}
