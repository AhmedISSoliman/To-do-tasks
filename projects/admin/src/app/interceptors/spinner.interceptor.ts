import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusyService } from '../services/busy.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService, private busyService: BusyService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const noLoader = request.body?.noLoader;
    if (noLoader) return next.handle(request);
    this.busyService.requstBusy();
    return next.handle(request).pipe(
      finalize(() => {
        this.busyService.requestDone();
      })
    );
  }
}
