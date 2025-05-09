import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { LoginResponseModel } from '../response/LoginResponse.model';
import {UsuarioLoginResponse} from '../response/UsuarioLoginResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private readonly http: HttpClient) { }

  login(correoUsuario: string, contraseniaUsuario: string): Observable<any> {
    const credentials = { correoUsuario, contraseniaUsuario };
    return this.http.post<LoginResponseModel>(this.apiUrl, credentials).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('usuarioActual', JSON.stringify(response.usuario));
        }
      })
    );
  }

  getUsuarioActual(): UsuarioLoginResponse | null {
    const usuarioJson = localStorage.getItem('usuarioActual');
    return usuarioJson ? JSON.parse(usuarioJson) as UsuarioLoginResponse : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
