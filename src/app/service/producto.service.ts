import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto.model';
import { ProductoRequest } from '../request/ProductoRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private readonly apiUrl = 'http://localhost:8080/api/productos';

  constructor(private readonly http: HttpClient) {}

  crearProducto(request: ProductoRequest): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, request);
  }

  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  obtenerProductoPorId(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  actualizarProducto(id: string, request: ProductoRequest): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, request);
  }

  eliminarProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
