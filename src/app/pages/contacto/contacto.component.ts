import { Component, OnInit } from '@angular/core';
import { ConctactoModel } from 'src/app/models/contacto.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { GenericsService } from 'src/app/services/generics.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  contacto = new ConctactoModel();
  telefono:string;

  constructor(private _svSend:GenericsService,
              private route:Router) { }


  ngOnInit(): void {
  }

  send(form: NgForm){

    if(form.invalid){return}

    console.log(this.contacto);
    
    Swal.fire({
      title: 'Espere',
      text: 'Enviando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();
    
    

    this._svSend.enviarEmail(this.contacto).subscribe((resp)=>{
      Swal.close();
      this.route.navigateByUrl('/respuesta');
    });
  }
}
