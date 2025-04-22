import { Product } from "../models/product.model";

export interface GetProductsDto {
  data: Product[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
}
