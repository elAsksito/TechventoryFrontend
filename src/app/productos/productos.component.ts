import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../models/Producto.model';
import { FormsModule } from '@angular/forms';
import {ExcelExportService} from '../service/excelexport.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  searchQueryNombre: string = '';
  searchQueryCategoria: string = '';
  searchQueryEstado: string = '';

  nombreArchivo: string = '';

  constructor(
    private readonly productoService: ProductoService,
    private readonly excelExportService: ExcelExportService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.listarProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.productosFiltrados = [...productos];
        this.isLoading = false;
        this.verificarProductosVacios();
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener productos';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  buscarProductos(): void {
    if (!this.productos.length) return;

    const nombreQuery = this.searchQueryNombre.trim().toLowerCase();
    const categoriaQuery = this.searchQueryCategoria.trim().toLowerCase();
    const estadoQuery = this.searchQueryEstado.trim().toLowerCase();

    this.productosFiltrados = this.productos.filter(producto => {
      const nombreMatch = nombreQuery === '' ||
        producto.nombreProducto.toLowerCase().includes(nombreQuery);

      const categoriaMatch = categoriaQuery === '' ||
        (producto.categoria?.nombreCategoria?.toLowerCase() || '').includes(categoriaQuery);

      const estadoMatch = estadoQuery === '' ||
        (producto.estado?.nombreEstado?.toLowerCase() || '').includes(estadoQuery);

      return nombreMatch && categoriaMatch && estadoMatch;
    });

    this.verificarProductosVacios();
  }

  private verificarProductosVacios(): void {
    if (this.productos.length === 0) {
      this.errorMessage = 'No hay productos disponibles.';
    } else if (this.productosFiltrados.length === 0) {
      this.errorMessage = 'No se encontraron productos que coincidan con la búsqueda.';
    } else {
      this.errorMessage = '';
    }
  }

  limpiarFiltros(): void {
    this.searchQueryNombre = '';
    this.searchQueryCategoria = '';
    this.searchQueryEstado = '';
    this.productosFiltrados = [...this.productos];
    this.verificarProductosVacios();
  }

  exportarAExcel(): void {
    if (!this.nombreArchivo) {
      this.nombreArchivo = 'productos';
    }

    const usuarioJson = localStorage.getItem('usuarioActual');
    const usuario = usuarioJson ? JSON.parse(usuarioJson) : null;

    if (usuario && usuario.id) {
      this.excelExportService.exportarExcel(usuario.id, this.productosFiltrados).subscribe((response: any) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${this.nombreArchivo}.xlsx`);
      });
    } else {
      console.error('Usuario no encontrado en localStorage');
    }
  }
}
