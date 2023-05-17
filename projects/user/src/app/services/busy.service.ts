import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  requestCounter = 0;
  constructor(private spinner: NgxSpinnerService) { }

  requstBusy() {
    this.requestCounter++;
    this.spinner.show();
  }

  requestDone() {
    this.requestCounter--;
    if (this.requestCounter <= 0) {
      this.requestCounter = 0;
      this.spinner.hide();
    }
  }
}
