import { Car } from './../model/Car';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get(`${environment.api}/cars`).pipe(take(1));
  }

  saveCar(car: Car) {
    return this.http.post(`${environment.api}/cars`, car).pipe(take(1));
  }

  deleteCar(car: Car) {
    return this.http.delete(`${environment.api}/cars/${car.id_car}`).pipe(take(1));
  }
}
