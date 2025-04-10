import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = 'https://localhost:7246/api/purchases';

  constructor(private http: HttpClient) { }

  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.apiUrl);
  }

  getPurchase(id: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.apiUrl}/${id}`);
  }

  createPurchase(purchase: any): Observable<Purchase> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Purchase>(this.apiUrl, purchase, { headers });
  }
}
