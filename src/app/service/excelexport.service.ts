import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  private readonly apiUrl = 'http://localhost:8080/api/productos/exportar';

  constructor(private readonly http: HttpClient) { }

  exportarExcel(userId: string, productos: any[]): Observable<Blob> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post(this.apiUrl, productos, { params, responseType: 'blob' });
  }
}
