import { CommonModule } from '@angular/common';
import { Component,input,output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone:true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();

  expandedMenus: Record<string, boolean> = {};

  items = [
    {
      routeLink:'perfil',
      icon: 'fal fa-id-card',
      label: 'Perfil',
    },
    {
      
      label: 'Administración',
      icon: 'bi bi-speedometer2',
      children:[
        {routeLink: 'usuarios',label:'Usuarios'},
        {routeLink: 'rol', label:'Roles'}
      ]
    },
    {
      label: 'Inventario',
      icon: 'fal fa-chart-bar',
      children: [
        { routeLink: 'productos', label: 'Productos' },
        { routeLink: 'categorias', label: 'Categorías' },
        { routeLink: 'estado', label: 'Estado' },
      ]
    },
    {
      routeLink: 'salir',
      icon: 'fal fa-sign-out-alt',
      label: 'Salir',
    },
  ];
  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }
  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
  toggleSubmenu(label: string): void {
    this.expandedMenus[label] = !this.expandedMenus[label];
  }

  closeAllSubmenus(): void {
    for (const key in this.expandedMenus) {
      this.expandedMenus[key] = false;
    }}
}
