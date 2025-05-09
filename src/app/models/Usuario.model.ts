import {Rol} from './Rol.model';

export interface Usuario {
  idUsuario: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  dniUsuario: string;
  telefonoUsuario: string;
  correoUsuario: string;
  usernameUsuario: string;
  contraseniaUsuario: string;
  estadoUsuario: string;
  rol: Rol;
}
