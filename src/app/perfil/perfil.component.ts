import {Component, OnInit} from '@angular/core';
import {UsuarioLoginResponse} from '../response/UsuarioLoginResponse.model';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuario: UsuarioLoginResponse | null = null;

  ngOnInit(): void {
    const usuarioJson = localStorage.getItem('usuarioActual');
    if (usuarioJson) {
      this.usuario = JSON.parse(usuarioJson) as UsuarioLoginResponse;
    }
  }
}
