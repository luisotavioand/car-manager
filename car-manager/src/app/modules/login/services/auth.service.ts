import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) { }

  login(username: string, password: string) {
    const user: any = { email: username, password};
    return this.http.post(`${environment.api}/session`, user).pipe(take(1));
  }

  logout() {
    localStorage.removeItem('gestCar');
    this.router.navigate(['login']);
  }
}
