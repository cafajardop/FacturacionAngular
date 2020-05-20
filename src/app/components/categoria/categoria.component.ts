import { Component, OnInit } from '@angular/core';
import { GenericsService } from 'src/app/services/generics.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styles: [
  ]
})
export class CategoriaComponent implements OnInit {
  categoria = new CategoriaModel();

  constructor(private categoriaService: GenericsService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    
    if(id !== 'nuevo'){
      this.categoriaService.getCategoria(id).subscribe((resp:CategoriaModel)=>{
        this.categoria = resp[0];
        console.log(resp[0]);
      })
    }

  }


  guardar(form: NgForm){
    if(form.invalid){return}
    
    //Importamos la libreria de swal
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    // Declaramos esta variable de tipo let observable para ya sea recibir la informacion de actualizar heroe o crear heroe
    let peticion: Observable<any>;
    let mensaje: boolean;

    if (this.categoria.idCategoria) {
      peticion = this.categoriaService.actualizarCategoria(this.categoria);
      mensaje = true;
    } else {
      peticion = this.categoriaService.crearCategoria(this.categoria);
      mensaje = false;
    }

    // En este punto la peticion nos retorna algo ya sea si actualizo o creo el heroe
    peticion.subscribe((resp) => {
      console.log(resp);
      Swal.close();
      if (mensaje) {
        Swal.fire({
          title: this.categoria.NombreCategoria,
          text: 'Se actualizó correctamente',
          icon: 'success',
        }),((err)=>{
          console.log(err.error)
        });
      } else {
        Swal.fire({
          title: this.categoria.NombreCategoria,
          text: 'Se creo correctamente',
          icon: 'success',
        }),((err)=>{
          console.log(err.error)
        })
        
        ;
      }

    });
  }




}
