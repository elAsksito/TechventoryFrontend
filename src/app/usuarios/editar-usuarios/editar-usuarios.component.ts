import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {Usuario} from '../../models/Usuario.model';
import {UsuarioService} from '../../service/usuario.service';
import {RegisterRequest} from '../../request/RegisterRequest.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-editar-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-usuarios.component.html',
  styleUrl: './editar-usuarios.component.css'
})
export class EditarUsuariosComponent implements OnInit {
  usuario: Usuario | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const usuarioId = this.route.snapshot.paramMap.get('idUsuario');
    if (usuarioId) {
      this.obtenerUsuarioPorId(usuarioId);
    }
  }

  obtenerUsuarioPorId(id: string): void {
    this.usuarioService.obtenerUsuarioPorId(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener el usuario';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  actualizarUsuario(): void {
    if (this.usuario) {
      const usuarioRequest: RegisterRequest = {
        nombreUsuario: this.usuario.nombreUsuario,
        apellidoUsuario: this.usuario.apellidoUsuario,
        dniUsuario: this.usuario.dniUsuario,
        telefonoUsuario: this.usuario.telefonoUsuario,
        correoUsuario: this.usuario.correoUsuario,
        usernameUsuario: this.usuario.usernameUsuario,
        contraseniaUsuario: '',
        estadoUsuario: this.usuario.estadoUsuario,
        rol: this.usuario.rol.nombreRol
      };

      this.usuarioService.actualizarUsuario(this.usuario.idUsuario, usuarioRequest).subscribe({
        next: () => {
          alert('Usuario actualizado');
          this.router.navigate(['/usuarios']);
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el usuario';
          console.error(error);
        }
      });
    }
  }
}
