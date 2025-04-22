import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { GetProductsDto } from '../dtos/get-product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7246/api/Products';

  constructor(private http: HttpClient) { }

  getProducts(pageNumber: number, pageSize: number): Observable<GetProductsDto> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<GetProductsDto>(`${this.apiUrl}/GetProducts`, { params });
  }


  getProduct(id: number): Observable<Product> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Product>(`${this.apiUrl}/GetProduct`, { params });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/AddProduct`, product);
  }

  updateProduct(id: number, product: Product): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.put(`${this.apiUrl}/UpdateProduct`, product, { params });
  }

  deleteProduct(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(`${this.apiUrl}/DeleteProduct`, { params });
  }
}
