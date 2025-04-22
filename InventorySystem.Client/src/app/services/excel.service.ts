import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private apiUrl = 'https://localhost:7246/api/Excels';

  constructor(private http: HttpClient) { }

  exportProducts(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/ExportProducts`, { responseType: 'blob' });
  }

}
