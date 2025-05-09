import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Categoria} from '../models/Categoria.model';
import {CategoriaService} from '../service/categoria.service';

@Component({
  selector: 'app-categorias',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements  OnInit {
  categorias: Categoria[] = [];

  constructor(private readonly categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.listarCategoria();
  }

  listarCategoria(): void{
    this.categoriaService.listarCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Solicitud de categorias completada');
      }
    })
  }
}
