import { take } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branch } from '../model/Branch';
import { Model } from '../model/Model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  getModelsByBranch(branch: Branch) {
    return this.http.get(`${environment.api}/branches/${branch.id_branch}/models`).pipe(take(1));
  }

  saveModel(branch: Branch, model: Model) {
    return this.http.post(`${environment.api}/branches/${branch.id_branch}/models`, model).pipe(take(1));
  }

  deleteModel(branch: Branch, model: Model) {
    return this.http.delete(`${environment.api}/branches/${branch.id_branch}/models/${model.id_model}`).pipe(take(1));
  }

  editModel(branch: Branch, model: Model) {
    return this.http.put(`${environment.api}/branches/${branch.id_branch}/models/${model.id_model}`, model).pipe(take(1));
  }
}
