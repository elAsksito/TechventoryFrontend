import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { RolService } from '../../service/rol.service';
import { Rol } from '../../models/Rol.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-editar-rol',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-rol.component.html',
  styleUrl: './editar-rol.component.css'
})
export class EditarRolComponent implements OnInit {
  rol: Rol | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly rolService: RolService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const rolId = params.get('idRol');
      if (rolId) {
        this.obtenerRolPorId(rolId);
      } else {
        this.errorMessage = 'ID de rol no encontrado en la URL';
      }
    });
  }

  obtenerRolPorId(id: string): void {
    this.rolService.obtenerRolPorId(id).subscribe({
      next: (rol) => {
        this.rol = rol;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener el rol';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  actualizarRol(): void {
    if (this.rol) {
      this.rolService.actualizarRol(this.rol.idRol, this.rol).subscribe({
        next: () => {
          alert('Rol actualizado');
          this.router.navigate(['/rol']);
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el rol';
          console.error(error);
        }
      });
    }
  }
}
