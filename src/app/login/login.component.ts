import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correoUsuario: string = '';
  contraseniaUsuario: string = '';
  errorMessage: string = '';

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  onLogin(): void {
    this.authService.login(this.correoUsuario, this.contraseniaUsuario).subscribe({
      next: (response) => {
        console.log('Respuesta del login:', response);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.error('Error al hacer login:', err);
        this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
      }
    });
  }
}
