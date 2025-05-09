import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { Rol } from '../models/Rol.model'
import {RolService} from '../service/rol.service';

@Component({
  selector: 'app-rol',
  imports: [CommonModule, RouterModule],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent implements OnInit {
  roles: Rol[] = [];

  constructor(private readonly rolService: RolService, private readonly router: Router) {}

  ngOnInit(): void {
    this.listarRoles();
  }

  listarRoles(): void {
    this.rolService.listarRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (error) => {
        console.error('Error al cargar los roles', error);
      },
      complete: () => {
        console.log('Solicitud de roles completada');
      }
    });
  }
}
