export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stripePriceId: string;
  createdAt: Date;
  updatedAt: Date;
  isFeatured: boolean;
}
