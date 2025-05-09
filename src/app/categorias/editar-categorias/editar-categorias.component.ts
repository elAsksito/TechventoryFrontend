import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../models/Categoria.model';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-categorias',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css']
})
export class EditarCategoriasComponent implements OnInit {
  categoria: Categoria | null = null;
  categoriaForm: FormGroup;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly categoriaService: CategoriaService,
    private readonly fb: FormBuilder
  ) {
    this.categoriaForm = this.fb.group({
      nombreCategoria: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idCategoria = params.get('idCategoria');
      if (idCategoria) {
        this.obtenerCategoriaPorId(idCategoria);
      } else {
        this.errorMessage = 'ID de categoría no encontrado en la URL';
      }
    });
  }

  obtenerCategoriaPorId(id: string): void {
    this.categoriaService.obtenerCategoriaPorId(id).subscribe({
      next: (categoria) => {
        this.categoria = categoria;
        this.isLoading = false;
        this.categoriaForm.patchValue({
          nombreCategoria: categoria.nombreCategoria,
          descripcion: categoria.descripcion
        });
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener la categoría';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  actualizarCategoria(): void {
    if (this.categoria && this.categoriaForm.valid) {
      const updatedCategoria = this.categoriaForm.value;
      this.categoriaService.actualizarCategoria(this.categoria.idCategoria, updatedCategoria).subscribe({
        next: () => {
          alert('Categoría actualizada');
          this.router.navigate(['/categorias']);
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar la categoría';
          console.error(error);
        }
      });
    }
  }
}
