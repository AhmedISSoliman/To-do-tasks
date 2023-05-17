import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'projects/admin/src/environments/environment';
import { ApiPaths } from 'projects/admin/src/environments/urls';
import { UserListResponse } from '../../tasks-admin/models/user-list-response.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient
  ) { }

  getAllUsers(searshParams: any): Observable<UserListResponse> {
    let params = new HttpParams();
    Object.entries(searshParams).forEach(([key, value]: any) => {
      if (value) {
        params = params.append(key, value)
      }
    })
    return this.http.get<UserListResponse>(`${environment.baseUrl}${ApiPaths.GetAllUsers}`, { params })
  }
  deleteUser(userId: string) {
    return this.http.delete<any>(`${environment.baseUrl}${ApiPaths.DeleteUser}${userId}`)
  }
  changeStatus(userId: string, userStatus: string) {
    return this.http.put<any>(`${environment.baseUrl}${ApiPaths.ChangeStatus}`, { id: userId, status: userStatus })
  }
}
