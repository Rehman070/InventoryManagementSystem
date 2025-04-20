import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = 'https://localhost:7246/api/Purchases';

  constructor(private http: HttpClient) { }

  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.apiUrl}/GetPurchases`);
  }

  getPurchase(id: number): Observable<Purchase> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Purchase>(`${this.apiUrl}/GetPurchase`, { params });
  }

  createPurchase(purchase: any): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.apiUrl}/AddPurchase`, purchase);
  }
}
