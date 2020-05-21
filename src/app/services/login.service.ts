import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { LoginModel } from '../models/loginModel';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userToken: string;
  
  constructor(private http: HttpClient) {
    this.leerToken();    
  }

  logout(){
    localStorage.removeItem('expira');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }


  login(usuario: LoginModel) {
    let url = URL_SERVICIOS + '/api/login/authenticate';
    console.log(url);
    return this.http.post(`${url}`, usuario)
    .pipe(
      map((resp: any) => {
        if (resp !== "0"){
          this.guardarToken(resp);
        }
        return resp;
      })) ;

      
  }

  //Guardar en el local storage
  private guardarToken(idToken: string) {
    console.log(`Token generado ${idToken}`);

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getDate().toString());
  }

  //Leer token
  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  //Crear un nuevo usuario
  nuevoUsuario(usuario: LoginModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    let url = URL_SERVICIOS + '/api/login/registrarse';
    console.log(url);
    return this.http.post(`${url}`, usuario)
    .pipe(
      map((resp: any) => {
        if (resp !== "0"){
          this.guardarToken(resp);
        }
        return resp;
      })) ;
  
    // return this.http  
    //   .post(`${this.url}signUp?key=${this.apikey}`, authData)
    //   .pipe(
    //       map((resp)=>{
    //         this.guardarToken(resp["idToken"]);
    //         return resp;
    //       })
    //   )
  }

  estaAutenticado(): boolean {
    //console.log(`Este es mi token ${this.userToken}` )
    return this.userToken.length  > 2;
  }
}
