import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuarioLogin: LoginModel;
  constructor(private auth:LoginService,
              private router: Router) { }

  ngOnInit() {
    this.usuarioLogin = new LoginModel();
  }

  onSubmit(form:NgForm){
    if(form.invalid){return};

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text:'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuarioLogin)
    .subscribe(resp =>{
      Swal.close();

      if(resp !== "0")
      {
        Swal.fire({
          allowOutsideClick:false,
          icon:'success',
          title:'Registro Exitoso',
          text: 'Usuario creado Correctamente'
       });
        this.router.navigateByUrl('/home');
      }
      else{
        Swal.fire({
          allowOutsideClick: false,
          icon:'error',
          title:'Error al crear usuario', 
          text: 'Correo ya existe inicie sesion'
        });
        this.router.navigateByUrl('/login');
      }      
    },(err)=>{
      Swal.fire({
         allowOutsideClick:false,
         icon:'error',
         title:'Error al Registrarse',
         text: err.error.error.message
      });
    })
  }
}
