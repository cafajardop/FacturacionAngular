import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { CategoriaModel } from '../models/categoria.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GenericsService {
  constructor(public http: HttpClient) {}

  cargarCategoria() {
    let url = URL_SERVICIOS + '/Categoria/GetCategoria';
    return this.http.get(url);
  }

  getCategoria(id: string) {
    let url = URL_SERVICIOS + '/Categoria/GetCategoriaId?id=';
    return this.http.get(`${url}${id}`);
  }

  //Actualizar Usuario
  actualizarCategoria(categoria: CategoriaModel) {
    let url = URL_SERVICIOS + '/Categoria/UpdateCategoria';
    return this.http.put(`${url}`, categoria);
  }

  //Crear usuario
  crearCategoria(categoria: CategoriaModel) {
    let url = URL_SERVICIOS + '/Categoria/InsertCategoria';
    console.log(url);
    return this.http.post(`${url}`, categoria)
    .pipe(
      map((resp: any) => {
        categoria.idCategoria = resp.ID;
        console.log(resp);
        return categoria;
      })
    );
  }

  borrarCategoria(id: string){
    let url = URL_SERVICIOS + '/Categoria/DeleteCategoria?id=';
    return this.http.delete(`${url}${id}`)
  }
}
