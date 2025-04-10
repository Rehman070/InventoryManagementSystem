import { Product } from './product.model';

export class Purchase {
  id: number | null = null;
  productId: number | null = null;
  product: Product | null = null;
  quantityPurchased: number | null = null;
  totalPrice: number | null = null;
  purchaseDate: string | null = null;
  supplier: string | null = null;
}
