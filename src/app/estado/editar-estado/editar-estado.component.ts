import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EstadoService } from '../../service/estado.service';
import { Estado } from '../../models/Estado.model';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-estado',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-estado.component.html',
  styleUrls: ['./editar-estado.component.css']
})
export class EditarEstadoComponent implements OnInit {
  estado: Estado | null = null;
  estadoForm: FormGroup;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly estadoService: EstadoService,
    private readonly fb: FormBuilder
  ) {
    this.estadoForm = this.fb.group({
      nombreEstado: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idEstado = params.get('idEstado');
      if (idEstado) {
        this.obtenerEstadoPorId(idEstado);
      } else {
        this.errorMessage = 'ID del estado no encontrado en la URL';
      }
    });
  }

  obtenerEstadoPorId(id: string): void {
    this.estadoService.obtenerEstadoPorId(id).subscribe({
      next: (estado) => {
        this.estado = estado;
        this.isLoading = false;
        this.estadoForm.patchValue({
          nombreEstado: estado.nombreEstado,
          descripcion: estado.descripcion
        });
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener el estado';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  actualizarEstado(): void {
    if (this.estado && this.estadoForm.valid) {
      const updatedEstado: Estado = this.estadoForm.value;
      this.estadoService.actualizarEstado(this.estado.idEstado, updatedEstado).subscribe({
        next: () => {
          alert('Estado actualizado correctamente');
          this.router.navigate(['/estado']);
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el estado';
          console.error(error);
        }
      });
    }
  }
}
