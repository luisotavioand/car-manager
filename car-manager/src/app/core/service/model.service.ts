import { take } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../model/Brand';
import { Model } from '../model/Model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  getModelsByBrand(brand: Brand) {
    return this.http.get(`${environment.api}/brands/${brand.id_brand}/models`).pipe(take(1));
  }

  saveModel(brand: Brand, model: Model) {
    return this.http.post(`${environment.api}/brands/${brand.id_brand}/models`, model).pipe(take(1));
  }

  deleteModel(brand: Brand, model: Model) {
    return this.http.delete(`${environment.api}/brands/${brand.id_brand}/models/${model.id_model}`).pipe(take(1));
  }

  editModel(brand: Brand, model: Model) {
    return this.http.put(`${environment.api}/brands/${brand.id_brand}/models/${model.id_model}`, model).pipe(take(1));
  }
}
