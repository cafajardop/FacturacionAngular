import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(public auth: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
    //this.logger = this.auth.estaAutenticado();
    location.reload();
  }
  
}
