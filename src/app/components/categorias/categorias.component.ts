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
  categorias: CategoriaModel[] = [];
  cargando = false;
  
  totalRecords:number;
  page:number=1;

  constructor(private _categoriaService: GenericsService) {} 

  ngOnInit(): void {
    this.cargarCategoria();
    this.cargando = true;
    this._categoriaService.cargarCategoria().subscribe((resp) => {
      this.cargando = false;      
    });
  }
  
  cargarCategoria() {
    this._categoriaService.cargarCategoria().subscribe(
      (category: any) =>{(
        this.categorias = category.Registros,
        this.totalRecords = category.Total        
        )}
    );
  }

  buscarArticulo(texto: string) {
    if (texto.length === 0) {
      this.cargarCategoria();
      return;
    }

    this._categoriaService
      .getCategoriaName(texto)
      .subscribe((category: any) => {
        this.categorias = category;
        //console.log(category);
        
      });
  }

  borrarCategoria(categoria: CategoriaModel, i: number) {
    Swal.fire({
      title: 'Está seguro?',
      text: `Está seguro que desea borrar a ${categoria.NombreCategoria}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.categorias.splice(i, 1);
        this._categoriaService
          .borrarCategoria(categoria.idCategoria)
          .subscribe();
        
          Swal.fire({
          title: 'Categoria Borrada Correctamente!!!',
          icon: 'success',
        });
        location.reload();
      }
    });
  }
}
