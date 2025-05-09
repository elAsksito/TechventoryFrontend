import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario.model';
import { RegisterRequest } from '../request/RegisterRequest.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private readonly http: HttpClient) {}

  obtenerTodosUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  registrarUsuario(request: RegisterRequest): Observable<string> {
    return this.http.post<string>(this.apiUrl, request);
  }

  obtenerUsuarioPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  actualizarUsuario(id: string, request: RegisterRequest): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, request);
  }

  eliminarUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
