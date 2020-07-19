import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ProductoComponent } from './components/producto/producto.component';
import { FacturaComponent } from './components/factura/factura.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { RespuestacontactoComponent } from './pages/respuestacontacto/respuestacontacto.component';
import { ComparativesComponent } from './components/KnowledgeBaseEnglish/comparatives/comparatives.component';
import { SpeakingComponent } from './components/KnowledgeBaseEnglish/speaking/speaking.component';
import { ComparativeComponent } from './components/KnowledgeBaseEnglish/comparatives/comparative/comparative.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },    
  { path: 'Categorias', component: CategoriasComponent,canActivate:[AuthGuard] },
  { path: 'categoria/:id', component: CategoriaComponent,canActivate:[AuthGuard] },    
  // { path: 'producto', component: ProductoComponent,canActivate:[AuthGuard]},
  // { path: 'productos/:id', component: ProductosComponent,canActivate:[AuthGuard]},
  { path: 'comparatives', component: ComparativesComponent,canActivate:[AuthGuard]},
  { path: 'comparative/:id', component: ComparativeComponent,canActivate:[AuthGuard]},
  { path: 'speaking', component: SpeakingComponent,canActivate:[AuthGuard]},
  { path: 'speaking/:id', component: SpeakingComponent,canActivate:[AuthGuard]},
  { path: 'factura', component: FacturaComponent,canActivate:[AuthGuard]},
  { path: 'contacto', component: ContactoComponent},
  { path: 'respuesta', component: RespuestacontactoComponent},
  { path: 'registro', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', pathMatch:'full', redirectTo: 'registro'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
