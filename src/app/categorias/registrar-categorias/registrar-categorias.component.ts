import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../models/Categoria.model';
@Component({
  selector: 'app-registrar-categorias',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './registrar-categorias.component.html',
  styleUrl: './registrar-categorias.component.css'
})
export class RegistrarCategoriasComponent implements OnInit {
  categoriaForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly categoriaService: CategoriaService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      nombreCategoria: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  registrarCategoria(): void {
    if (this.categoriaForm.valid) {
      this.isLoading = true;
      const nuevaCategoria: Categoria = this.categoriaForm.value;
      this.categoriaService.guardarCategoria(nuevaCategoria).subscribe({
        next: () => {
          alert('Categoría registrada correctamente');
          this.router.navigate(['/categorias']);
        },
        error: (err) => {
          this.errorMessage = 'Error al registrar la categoría';
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }
}
