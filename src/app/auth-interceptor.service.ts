import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interception in progress....");//Interception stage
    const token : string |null = localStorage.getItem('token');//this retrieves the token stored in local storage
    req = req.clone({headers : req.headers.set('Authorization','Bearer '+token)});
    req = req.clone({headers : req.headers.set('Content-Type','application/json')});
    req = req.clone({headers : req.headers.set('Accept','application/json')});

    return next.handle(req)
                .pipe(
                  catchError((error : HttpErrorResponse) =>{
                      //catching error stage
                      if(error && error.status === 401){
                        console.log("Error 401 unauthorized");
                      }
                      const err = error.error.message || error.statusText;
                      return throwError(error);//any further errors are returned
                  })
                );
  }
}
