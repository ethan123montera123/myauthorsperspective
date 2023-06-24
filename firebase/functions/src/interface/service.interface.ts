export interface Service {
  title: string;
  unitPrice: number;
  inclusions: string[];
}

export interface ServiceOrder extends Service {
  quantity: number;
}
