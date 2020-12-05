import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { take } from 'rxjs/operators';
import { Brand } from '../model/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrands() {
    return this.http.get(`${environment.api}/brands`).pipe(take(1));
  }

  saveBrand(brand: Brand) {
    return this.http.post(`${environment.api}/brands`, brand).pipe(take(1));
  }

  deleteBrand(brand: Brand) {
    return this.http.delete(`${environment.api}/brands/${brand.id_brand}`).pipe(take(1));
  }

  updateBrand(brand: Brand) {
    return this.http.put(`${environment.api}/brands/${brand.id_brand}`, brand).pipe(take(1));
  }
}
