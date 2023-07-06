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
