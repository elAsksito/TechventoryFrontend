import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Rol } from '../../models/Rol.model';
import { RolService } from '../../service/rol.service';
import {RegisterRequest} from '../../request/RegisterRequest.model';
import {UsuarioService} from '../../service/usuario.service';
import {Router} from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-registrar-usuarios',
  standalone: true,
  imports: [CommonModule,RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registrar-usuarios.component.html',
  styleUrl: './registrar-usuarios.component.css'
})
export class RegistrarUsuariosComponent implements OnInit {

  usuarioForm!: FormGroup;
  roles: Rol[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly usuarioService: UsuarioService,
    private readonly rolService: RolService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      dniUsuario: ['', [Validators.required, Validators.maxLength(8)]],
      nombreUsuario: ['', Validators.required],
      apellidoUsuario: ['', Validators.required],
      usernameUsuario: ['', Validators.required],
      correoUsuario: ['', [Validators.required, Validators.email]],
      contraseniaUsuario: ['', Validators.required],
      telefonoUsuario: ['', Validators.required],
      rol: ['', Validators.required],
      estadoUsuario: ['Activo', Validators.required]
    });

    this.cargarRoles();
  }

  cargarRoles(): void {
    this.rolService.listarRoles().subscribe({
      next: (res) => this.roles = res,
      error: (err) => console.error('Error al cargar roles:', err)
    });
  }

  guardar(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const request: RegisterRequest = this.usuarioForm.value;

    this.usuarioService.registrarUsuario(request).subscribe({
      next: () => {
        alert('Usuario registrado correctamente');
        this.usuarioForm.reset();
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        alert('Error al registrar usuario');
      }
    });
  }
}
