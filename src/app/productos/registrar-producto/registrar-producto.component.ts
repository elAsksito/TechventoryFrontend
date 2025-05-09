import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import { ProductoService } from '../../service/producto.service';
import { ProductoRequest } from '../../request/ProductoRequest.model';
import { Categoria } from '../../models/Categoria.model';
import { Estado } from '../../models/Estado.model';
import { CategoriaService } from '../../service/categoria.service';
import { EstadoService } from '../../service/estado.service';
import {Router} from '@angular/router';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [CommonModule,RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css'
})
export class RegistrarProductoComponent implements OnInit{

  productoForm!: FormGroup;
  categorias: Categoria[] = [];
  estados: Estado[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly productoService: ProductoService,
    private readonly categoriaService: CategoriaService,
    private readonly estadoService: EstadoService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombreProducto: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(1)]],
      precio: [0.1, [Validators.required, Validators.min(0.01)]],
      sku: ['', Validators.required],
      descripcion: [''],
      codigoBarras: [''],
      idCategoria: ['', Validators.required],
      idEstado: ['', Validators.required],
    });

    this.cargarCategorias();
    this.cargarEstados();
  }

  cargarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe({
      next: (res) => this.categorias = res,
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  cargarEstados(): void {
    this.estadoService.listarEstados().subscribe({
      next: (res) => this.estados = res,
      error: (err) => console.error('Error al cargar estados:', err)
    });
  }

  guardar(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const request: ProductoRequest = this.productoForm.value;

    this.productoService.crearProducto(request).subscribe({
      next: (res) => {
        alert('Producto registrado correctamente');
        this.productoForm.reset();
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.error('Error al registrar producto:', err);
        alert('Error al registrar producto');
      }
    });
  }
}
