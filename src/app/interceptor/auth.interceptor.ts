import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService:UserService, private toastrService:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.userService.getToken()
    if(token){
      console.log(token,' token inside intercept');
      
      const authReq = request.clone({
        setHeaders:{
          Authorization:token
        }
      })
      return next.handle(authReq).pipe(
        catchError((error:HttpErrorResponse)=>{
          if(error.status ==500){
            this.toastrService.error('An internal server error occurred. Please try again later.', 'Server Error')
          }
          return throwError(error)
        })
      )
    }
    return next.handle(request);
  }
}
