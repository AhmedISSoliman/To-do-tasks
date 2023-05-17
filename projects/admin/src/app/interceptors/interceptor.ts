import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser = this.authService.currentUserValue;
    if (request.url.startsWith(environment.baseUrl))
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`
        }
      })

    return next.handle(request);
  }
}
