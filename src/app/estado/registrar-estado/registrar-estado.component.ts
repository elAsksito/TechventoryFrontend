import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EstadoService } from '../../service/estado.service';

@Component({
  selector: 'app-registrar-estado',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './registrar-estado.component.html',
  styleUrl: './registrar-estado.component.css'
})
export class RegistrarEstadoComponent implements OnInit {
  estadoForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly estadoService: EstadoService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.estadoForm = this.fb.group({
      nombreEstado: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  registrarEstado(): void {
    if (this.estadoForm.valid) {
      this.isLoading = true;
      const nuevoEstado = this.estadoForm.value;

      this.estadoService.crearEstado(nuevoEstado).subscribe({
        next: () => {
          alert('Estado registrado correctamente');
          this.router.navigate(['/estado']);
        },
        error: (err) => {
          this.errorMessage = 'Error al registrar el estado';
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }
}
