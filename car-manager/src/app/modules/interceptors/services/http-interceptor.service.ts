import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const clonedRequest: HttpRequest<any> = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; chartset=utf-8',
        'Authorization': `${localStorage.getItem('gestCar')}`,
      }
    });

    return next.handle(clonedRequest)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = `Erro(${error.status}): ${error.error.message}`;
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
        return throwError(errorMessage);
      })
    ) as Observable<HttpEvent<any>>;
  }
}
