import {UsuarioLoginResponse} from './UsuarioLoginResponse.model';

export interface LoginResponseModel {
  token: string;
  usuario: UsuarioLoginResponse
}
