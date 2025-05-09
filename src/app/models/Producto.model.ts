import { Categoria } from './Categoria.model';
import { Estado } from './Estado.model';

export interface Producto {
  idProducto: string;
  nombreProducto: string;
  stock: number;
  precio: number;
  sku: string;
  descripcion: string;
  codigoBarras: string;
  categoria: Categoria;
  estado: Estado;
}
