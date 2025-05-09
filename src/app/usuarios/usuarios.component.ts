import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Usuario} from '../models/Usuario.model';
import {UsuarioService} from '../service/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private readonly usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.obtenerTodosUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.isLoading = false;
        this.verificarUsuariosVacios();
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener usuarios';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  private verificarUsuariosVacios(): void {
    if (this.usuarios.length === 0) {
      this.errorMessage = 'No hay usuarios disponibles.';
    } else {
      this.errorMessage = '';
    }
  }
}
