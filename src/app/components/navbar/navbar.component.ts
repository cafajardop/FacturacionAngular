import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { GenericsService } from 'src/app/services/generics.service';
import { CategoriaModel } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  
  categorias: CategoriaModel[] = [];
  autenticado:boolean = false;

  constructor(
    public auth: LoginService,
    private router: Router,
    private _categoriaService: GenericsService
  ) {
    console.log(`${auth.estaAutenticado()} este es el navbar` );
  }

  ngOnInit(): void {
    
    this.autenticado
  }

  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
    //this.logger = this.auth.estaAutenticado();
    location.reload();
  }

  
}
