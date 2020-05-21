import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: LoginModel;

  constructor(private router: Router,
    private auth:LoginService) { }

  ngOnInit() {
    this.usuarioLogin = new LoginModel();
  }

  login(form: NgForm){
    if(form.invalid){return;}
    
    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      text:'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login(this.usuarioLogin)
    .subscribe(resp =>{
        Swal.close();
        
        console.log(`Respuesta desde el componente ${resp}`);
        if(resp !== "0")
        {
          this.router.navigateByUrl('/home');
        }else{
          Swal.fire({
            allowOutsideClick: false,
            icon:'error',
            title:'Error al autenticar',
            text: 'Usuario o contraseña Invalido'
          });
        }
        
        // setTimeout(function () {
        //   location.reload();
        // }, 2000);

    }, (err)=>{
      console.log(err.error.error.message);
      Swal.fire({
        allowOutsideClick: false,
        icon:'error',
        title:'Error al autenticar',
        text: err.error.error.message
      });
    })
  }
}
