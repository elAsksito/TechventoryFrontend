import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private readonly apiUrl = 'http://localhost:8080/api/roles';

  constructor(private readonly http: HttpClient) {}

  listarRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl);
  }

  crearRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiUrl, rol);
  }

  actualizarRol(id: string, rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.apiUrl}/${id}`, rol);
  }

  obtenerRolPorId(id: string): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/${id}`);
  }
}
