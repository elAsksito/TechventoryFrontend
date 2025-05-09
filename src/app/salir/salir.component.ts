import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salir',
  imports: [],
  templateUrl: './salir.component.html',
  styleUrl: './salir.component.css'
})
export class SalirComponent implements  OnInit{

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }
}
