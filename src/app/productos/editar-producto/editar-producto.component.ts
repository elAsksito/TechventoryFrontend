import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductoService } from '../../service/producto.service';
import { ProductoRequest } from '../../request/ProductoRequest.model';
import { CategoriaService } from '../../service/categoria.service';
import { EstadoService } from '../../service/estado.service';
import { Categoria } from '../../models/Categoria.model';
import { Estado } from '../../models/Estado.model';
import { Producto } from '../../models/Producto.model';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  productoForm!: FormGroup;
  productoId: string | null = null;
  categorias: Categoria[] = [];
  estados: Estado[] = [];
  producto: ProductoRequest | null = null;
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly productoService: ProductoService,
    private readonly categoriaService: CategoriaService,
    private readonly estadoService: EstadoService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productoId = params.get('idProducto');
      if (this.productoId) {
        this.obtenerProductoPorId(this.productoId);
      } else {
        this.errorMessage = 'ID de producto no encontrado en la URL';
        this.isLoading = false;
      }
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

  obtenerProductoPorId(id: string): void {
    this.productoService.obtenerProductoPorId(id).subscribe({
      next: (producto) => {
        this.producto = this.mapearProductoAProductoRequest(producto);
        this.isLoading = false;
        this.iniciarFormulario();
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener el producto';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  mapearProductoAProductoRequest(producto: Producto): ProductoRequest {
    return {
      nombreProducto: producto.nombreProducto,
      stock: producto.stock,
      precio: producto.precio,
      sku: producto.sku,
      descripcion: producto.descripcion,
      codigoBarras: producto.codigoBarras,
      idCategoria: producto.categoria.idCategoria,
      idEstado: producto.estado.idEstado
    };
  }

  iniciarFormulario(): void {
    if (this.producto) {
      this.productoForm = this.fb.group({
        nombreProducto: [this.producto.nombreProducto, Validators.required],
        stock: [this.producto.stock, [Validators.required, Validators.min(1)]],
        precio: [this.producto.precio, [Validators.required, Validators.min(0.01)]],
        sku: [this.producto.sku, Validators.required],
        descripcion: [this.producto.descripcion],
        codigoBarras: [this.producto.codigoBarras],
        idCategoria: [this.producto.idCategoria, Validators.required],
        idEstado: [this.producto.idEstado, Validators.required],
      });
    }
  }

  actualizarProducto(): void {
    if (this.productoForm.valid && this.productoId) {
      const request: ProductoRequest = this.productoForm.value;

      this.productoService.actualizarProducto(this.productoId, request).subscribe({
        next: () => {
          alert('Producto actualizado correctamente');
          this.router.navigate(['/productos']);
        },
        error: (err) => {
          this.errorMessage = 'Error al actualizar producto';
          console.error('Error:', err);
        }
      });
    } else {
      this.productoForm.markAllAsTouched();
    }
  }
}
