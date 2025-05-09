export interface ProductoRequest {
  nombreProducto: string;
  stock: number;
  precio: number;
  sku: string;
  descripcion?: string;
  codigoBarras?: string;
  idCategoria: string;
  idEstado: string;
}
