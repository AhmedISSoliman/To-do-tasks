import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/user/src/environments/environment';
import { ApiPath } from '../../environments/urls';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any> | any;
  currentUserAction$: Observable<any> | any;

  private currentUserSubjectId: BehaviorSubject<any> | any;
  currentUserIdAction$: Observable<any> | any;

  private currentUserSubjectData: BehaviorSubject<any> | any;
  currentUserDataAction$: Observable<any> | any;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('userToken'));
    this.currentUserAction$ = this.currentUserSubject.asObservable();

    this.currentUserSubjectId = new BehaviorSubject<any>(localStorage.getItem('userId'));
    this.currentUserIdAction$ = this.currentUserSubjectId.asObservable();
  }

  login(formData: any) {
    return this.http.post<any>(`${environment.baseUrl}${ApiPath.Login}`, formData)
  }
  register(formData: any) {
    return this.http.post<any>(`${environment.baseUrl}${ApiPath.register}`, formData)
  }
  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    this.currentUserSubject.next(null);
    this.currentUserSubjectId.next(null);
    this.router.navigate(['/login'])
  }
  saveCurrentUserToken() {
    let currentUser: any = localStorage.getItem('userToken');
    let currentUserId: any = localStorage.getItem('userId');
    this.currentUserSubject.next(currentUser);
    this.currentUserSubjectId.next(currentUserId);
  }
  userData() {
    let decoded: any = localStorage.getItem('userToken');
    let incoded = jwt_decode(decoded);
    return incoded;
  }
  get currentUserValue() {
    return this.currentUserSubject.value;
  }
  get currentUserIsValue() {
    return this.currentUserSubjectId.value;
  }
}
