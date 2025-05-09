import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RolService } from '../../service/rol.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-rol',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrar-rol.component.html',
  styleUrls: ['./registrar-rol.component.css']
})
export class RegistrarRolComponent implements OnInit {
  rolForm: any;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly rolService: RolService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.rolForm = this.fb.group({
      nombreRol: ['', [Validators.required]],
      descripcionRol: ['', [Validators.required]]
    });
  }

  registrarRol(): void {
    if (this.rolForm.valid) {
      this.rolService.crearRol(this.rolForm.value).subscribe({
        next: () => {
          this.successMessage = 'Rol creado con éxito';
          alert(this.successMessage);
          this.router.navigate(['/rol']);
        },
        error: (error) => {
          this.errorMessage = 'Error al crear el rol';
          console.error(this.errorMessage, error);
          alert(this.errorMessage);
        }
      });
    } else {
      this.rolForm.markAllAsTouched();
    }
  }
}
