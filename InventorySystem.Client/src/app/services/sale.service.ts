import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = 'https://localhost:7246/api/Sales';

  constructor(private http: HttpClient) { }

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/GetSales`);
  }

  getSale(id: number): Observable<Sale> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Sale>(`${this.apiUrl}/GetSale`, { params });
  }

  createSale(sale: any): Observable<Sale> {
    return this.http.post<Sale>(`${this.apiUrl}/AddSale`, sale);
  }
}
