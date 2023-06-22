export interface Service {
  title: string;
  priceTiers: Record<string, number>;
  inclusions: string[];
}
