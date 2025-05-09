import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import {LeftSidebarComponent} from './left-sidebar/left-sidebar.component';
import { ProductosComponent} from './productos/productos.component';
import { UsuariosComponent} from './usuarios/usuarios.component';
import { CategoriasComponent} from './categorias/categorias.component';
import {EditarCategoriasComponent} from './categorias/editar-categorias/editar-categorias.component';
import { RolComponent} from './rol/rol.component';
import { EditarRolComponent} from './rol/editar-rol/editar-rol.component';
import { RegistrarRolComponent} from './rol/registrar-rol/registrar-rol.component';
import {EditarProductoComponent} from './productos/editar-producto/editar-producto.component';
import {EditarUsuariosComponent} from './usuarios/editar-usuarios/editar-usuarios.component';
import { RegistrarCategoriasComponent} from './categorias/registrar-categorias/registrar-categorias.component';
import { RegistrarProductoComponent } from './productos/registrar-producto/registrar-producto.component';
import {RegistrarUsuariosComponent} from './usuarios/registrar-usuarios/registrar-usuarios.component'
import { EstadoComponent} from './estado/estado.component';
import { EditarEstadoComponent} from './estado/editar-estado/editar-estado.component';
import {RegistrarEstadoComponent} from './estado/registrar-estado/registrar-estado.component'
import {PerfilComponent} from './perfil/perfil.component'
import {SalirComponent} from './salir/salir.component'

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'left-sidebar', component: LeftSidebarComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  {path: 'categorias', component:CategoriasComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'rol', component: RolComponent, canActivate: [AuthGuard] },
  { path: 'rol/editar/:idRol', component: EditarRolComponent, canActivate: [AuthGuard] },
  { path: 'rol/nuevo', component: RegistrarRolComponent, canActivate: [AuthGuard] },
  { path: 'estado', component: EstadoComponent, canActivate: [AuthGuard] },
  { path: 'estado/editar/:idEstado', component: EditarEstadoComponent, canActivate: [AuthGuard] },
  { path: 'estado/nuevo', component: RegistrarEstadoComponent, canActivate: [AuthGuard] },
  {path:'categoria/editar/:idCategoria', component:EditarCategoriasComponent, canActivate: [AuthGuard] },
  {path:'producto/editar/:idProducto', component: EditarProductoComponent, canActivate: [AuthGuard] },
  {path:'usuario/editar/:idUsuario', component:EditarUsuariosComponent, canActivate: [AuthGuard] },
  {path: 'categorias/nuevo', component: RegistrarCategoriasComponent, canActivate: [AuthGuard] },
  { path: 'productos/nuevo', component: RegistrarProductoComponent, canActivate: [AuthGuard] },
  {path:'usuarios/nuevo', component:RegistrarUsuariosComponent, canActivate: [AuthGuard] },
  {path:'perfil', component:PerfilComponent, canActivate: [AuthGuard] },
  {path:'salir', component:SalirComponent}
];
