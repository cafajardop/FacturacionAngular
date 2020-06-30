import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompatariveModel } from 'src/app/models/comparatives.model';
import { ActivatedRoute } from '@angular/router';
import { KnowledgeBaseEnglishService } from 'src/app/services/knowledge-base-english.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comparative',
  templateUrl: './comparative.component.html',
  styleUrls: ['./comparative.component.css'
  ]
})
export class ComparativeComponent implements OnInit {
  comparative = new CompatariveModel();

  constructor(private route: ActivatedRoute,
    private _knowledgeServcies: KnowledgeBaseEnglishService) {
    const id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

  guardar(form: NgForm) {
    if (form.invalid) { return }

  console.log(this.comparative);


    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this._knowledgeServcies.InsertComparative(this.comparative)
      .subscribe( res => {
        Swal.close();
        if(res === true){
          Swal.fire('Insertado correctamente!!',`El id adjetivo ${this.comparative.Adjetive}`, 'success');
          form.reset();
          setTimeout(function(){ location.reload(), this.loading = false; }, 2000);
        }else{
          Swal.fire('El adjetivo ya existe !!',`El id adjetivo ${this.comparative.Adjetive}`, 'warning');
          form.reset();
          setTimeout(function(){ location.reload(), this.loading = false; }, 5000);
        }
      })
   }
}
