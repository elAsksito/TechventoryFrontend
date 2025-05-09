import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/Estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private readonly apiUrl = 'http://localhost:8080/api/estados';

  constructor(private readonly http: HttpClient) {}

  listarEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.apiUrl);
  }

  obtenerEstadoPorId(id: string): Observable<Estado> {
    return this.http.get<Estado>(`${this.apiUrl}/${id}`);
  }

  crearEstado(estado: { nombre: string }): Observable<Estado> {
    return this.http.post<Estado>(this.apiUrl, estado);
  }

  actualizarEstado(id: string, estado: { nombreEstado: string; descripcion: string }): Observable<Estado> {
    return this.http.put<Estado>(`${this.apiUrl}/${id}`, estado);
  }
}
