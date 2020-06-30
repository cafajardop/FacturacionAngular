import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { CompatariveModel } from '../models/comparatives.model';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeBaseEnglishService {

  constructor(public http: HttpClient) { }

  GetAllComparatives() {
    let url = URL_SERVICIOS + '/Comparatives/GetAllComparatives';
    return this.http.get(url);
  }

  GetFindComparativeName(filter: string) {
    let url = URL_SERVICIOS + '/Comparatives/GetFindComparativeName?filter=';
    return this.http.get(`${url}${filter}`);
  }

  UpdateComparative( user: CompatariveModel){
    let url = URL_SERVICIOS + '/Comparatives/UpdateComparative';
    return this.http.put(`${url}`, user);
  }

  InsertComparative( user: CompatariveModel){
    let url = URL_SERVICIOS + '/Comparatives/InsertComparative';
    return this.http.post(`${url}`, user);
  }
}