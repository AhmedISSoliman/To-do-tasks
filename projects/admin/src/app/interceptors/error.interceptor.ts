import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService, private spinner: NgxSpinnerService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // this.toastrService.show('You Are not Authorized');
          this.toastrService.show('session is expired');
          throw error
        }
        if (error.status == 500) {
          localStorage.removeItem('userToken');
          localStorage.removeItem('userId');
          this.toastrService.error(error.error.message, 'Error');
          this.router.navigate(['/login']);
          throw error;
        }
        else if (error.error.message === "jwt expired" || error.status == 500) {
          // this.toastrService.error(error.error.message, 'Error');
          this.router.navigate(['/login']);
          localStorage.removeItem('userToken');
          throw error
        }
        // else if (error.status > 500) {
        //   this.spinner.show();
        //   if (error.error.message == null || error.error.message == '' || !error.error.message || undefined) {
        //     this.toastrService.show('contact With Support Team');
        //   }
        //   else {
        //     this.toastrService.error(error.error.message, 'Error');
        //   }
        //   throw error
        // }
        else {
          throw error
        }
      })
    );
  }
}
