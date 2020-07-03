import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { KnowledgeBaseEnglishService } from 'src/app/services/knowledge-base-english.service';
import { CompatariveModel } from 'src/app/models/comparatives.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-comparatives',
  templateUrl: './comparatives.component.html',
  styleUrls: ['./comparatives.component.css'
  ]
})

export class ComparativesComponent implements OnInit {
  @ViewChild('closeModal') private closeModal: ElementRef;
  comparatives: CompatariveModel[] = [];
  comparative: CompatariveModel = new CompatariveModel;
  questions: CompatariveModel[] = [];
  name: any;
  totalRecords: number;
  page: number = 1;
  cargando = false;
  fileName= 'ExcelSheet.xlsx';  
  
  constructor(private _knowledgeServcies: KnowledgeBaseEnglishService,
              private route: Router) {

    this.getAllComparatives();
    this.cargando = true;
  }

  ngOnInit(): void {
  }

  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }
  

  getAllComparatives() {
    this._knowledgeServcies.GetAllComparatives()
      .subscribe(
        (comparatives: any) => {
          this.comparatives = comparatives.Registros;
          this.totalRecords = comparatives.Total;
          this.cargando = false;
        }
      )
  }

  borrarCategoria() {

  }

  getFindComparativeName(texto: string) {
    if (texto.length === 0) {
      this.getAllComparatives();
      return;
    }

    this._knowledgeServcies.GetFindComparativeName(texto)
      .subscribe((filter: any) => {
        this.comparatives = filter.Registros;
        this.totalRecords = filter.Total;
        console.log(filter);
      });
  }

  getFindComparativeID(texto: string) {
    this._knowledgeServcies.GetFindComparativeID(texto)
      .subscribe((id: any) => {
        this.questions = id.Registros;
        if (this.questions.length !== 0) {
          this.name = this.questions[0].Adjetive;
        }
      })
  }

  capturaModal() {

  }

  actualizarUsuario() {

  }
  guardar(form: NgForm) {
    if (form.invalid) {return;}

    this.comparative.Adjetive = form.value.Adjetive
    this.comparative.Comparativo = form.value.Comparativo
    this.comparative.Superlative = form.value.Superlative
    this.comparative.Spanish = form.value.Spanish
    this.comparative.Questions = form.value.Questions


    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();


    //console.log(this.comparative);

    this._knowledgeServcies.UpdateComparative(this.comparative)
      .subscribe(res => {
        Swal.close();
        console.log(res);
        if (res === true) {
          Swal.fire('Actualizado correcamente', `El id adjetivo ${this.comparative.Adjetive}`, 'success');
          form.reset();
          setTimeout(function () { location.reload(), this.loading = false; }, 2000);
        }
      })
  }

  updateComparative(user: CompatariveModel) {
    this.comparative = user
  }
}