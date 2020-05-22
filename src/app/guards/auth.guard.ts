import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: LoginService, 
            private router: Router) {}


  canActivate():boolean{
    
    if (this.auth.estaAutenticado()) {
      console.log('Esta atuenticado GUARD');
      console.log(this.auth.estaAutenticado());      
      return true;
    } else {
      console.log('No esta atuenticado GUARD');
      this.router.navigateByUrl('/login');
      return false;
    }

  }
  
}
