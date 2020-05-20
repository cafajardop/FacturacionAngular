import { Component, OnInit } from '@angular/core';
import { GenericsService } from 'src/app/services/generics.service';
import { CategoriaModel } from 'src/app/models/categoria.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: [],
})
export class CategoriasComponent implements OnInit {
  constructor(private _categoriaService: GenericsService) {}

  categorias: CategoriaModel[] = [];
  cargando = false;

  ngOnInit(): void {
    this.cargarCategoria();
    this.cargando = true;
    this._categoriaService.cargarCategoria().subscribe((resp) => {
      setTimeout(() => {
        this.cargando = false;
      }, 1000);
    });
  }

  cargarCategoria() {
    this._categoriaService.cargarCategoria().subscribe(
      (category: any) =>
        //console.log(category)
        (this.categorias = category)
    );
  }

  borrarCategoria(categoria: CategoriaModel,i:number){
    Swal.fire({
      title:'Está seguro?',
      text:`Está seguro que desea borrar a ${categoria.NombreCategoria}`,
      icon: 'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then( resp =>{
        if(resp.value){
          this.categorias.splice(i,1);
          this._categoriaService.borrarCategoria(categoria.idCategoria).subscribe();
          Swal.fire({
            title:'Categoria Borrada Correctamente!!!',
            icon:'success'
          })
        }
    })
  }

}
