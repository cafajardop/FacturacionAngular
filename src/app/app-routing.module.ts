import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ProductoComponent } from './components/producto/producto.component';
import { FacturaComponent } from './components/factura/factura.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },    
  { path: 'Categorias', component: CategoriasComponent},
  { path: 'categoria/:id', component: CategoriaComponent},    
  { path: 'producto', component: ProductoComponent},
  { path: 'productos/:id', component: ProductosComponent},
  { path: 'factura', component: FacturaComponent},
  { path: '**', pathMatch:'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
