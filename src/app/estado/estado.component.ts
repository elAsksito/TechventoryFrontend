import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Estado} from '../models/Estado.model';
import {EstadoService} from '../service/estado.service';
@Component({
  selector: 'app-estado',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './estado.component.html',
  styleUrl: './estado.component.css'
})
export class EstadoComponent implements OnInit {
  estados: Estado[] = [];

  constructor(private readonly estadoService: EstadoService) { }

  ngOnInit(): void {
    this.listarEstados()
  }

  listarEstados(): void {
    this.estadoService.listarEstados().subscribe({
      next: (data) => {
        this.estados = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Solicitud de estados completada');
      }
    })
  }

}
