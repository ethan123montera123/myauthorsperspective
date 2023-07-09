export type PriceTier = "basic" | "premium";

export type ServiceTierInfo = {
  level: number;
  price: number;
};

export type ServiceInclusion<T extends string> = {
  id: number;
  tier: T;
  name: string;
};

export type Service<T extends string = PriceTier> = {
  title: string;
  priceTier: { default: T } & Partial<Record<T, ServiceTierInfo>>;
  inclusions: ServiceInclusion<T>[];
};
