import { Product } from './product.model';

export class Sale {
  id: number | null = null;
  productId: number | null = null;
  product: Product | null = null;
  quantitySold: number | null = null;
  totalPrice: number | null = null;
  saleDate: string | null = null;
}
