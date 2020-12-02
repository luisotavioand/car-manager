import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { take } from 'rxjs/operators';
import { Branch } from '../model/Branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  getBrachs() {
    return this.http.get(`${environment.api}/branches`).pipe(take(1));
  }

  saveBranch(branch: Branch) {
    return this.http.post(`${environment.api}/branches`, branch).pipe(take(1));
  }

  deleteBranch(branch: Branch) {
    return this.http.delete(`${environment.api}/branches/${branch.id_branch}`).pipe(take(1));
  }

  updateBranch(branch: Branch) {
    return this.http.put(`${environment.api}/branches/${branch.id_branch}`, branch).pipe(take(1));
  }
}
