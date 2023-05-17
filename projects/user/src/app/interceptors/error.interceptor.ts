import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status == 401) {
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
        // else if (error.status > 500) {
        //   this.spinner.show();
        //   if (error.error.message == '' || error.error.message == null || error.error.message == undefined || !error.error.message) {
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
