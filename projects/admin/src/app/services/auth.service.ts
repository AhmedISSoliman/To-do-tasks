import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiPaths } from '../../environments/urls';
import { UserLogin } from '../models/user-login.model';
import { LoginResponse } from '../models/login-response.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any> | any;
  currentUserAction$: Observable<any> | any;

  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedInAction$ = this.isLoggedInSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      (localStorage.getItem('userToken')!)
    );
    this.currentUserAction$ = this.currentUserSubject.asObservable();
  }

  login(data: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.baseUrl}${ApiPaths.Login}`, data);
  }

  saveCurrentUserToken() {
    let currentUser: any = localStorage.getItem('userToken');
    this.currentUserSubject.next(currentUser);
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('userToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login'])
  }
}
