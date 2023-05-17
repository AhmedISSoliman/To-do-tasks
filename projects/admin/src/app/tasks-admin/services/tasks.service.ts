import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ApiPaths } from 'projects/admin/src/environments/urls';
import { Observable } from 'rxjs'
import { TasksListResponse } from '../models/tasks-list-response.model';
import { SearchParamsList } from '../models/tasks-search-list-params.model';
import { TasksAddModel } from '../models/tasks-add-new.model';
import { UserListResponse } from '../models/user-list-response.model';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) { }

  getAllTasks(searchParams: SearchParamsList): Observable<TasksListResponse> {
    let params = new HttpParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value)
        params = params.append(key, value)
    })
    return this.http.get<TasksListResponse>(`${environment.baseUrl}${ApiPaths.GetAllTasks}`, { params });
  }
  getAllUsers(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${environment.baseUrl}${ApiPaths.GetAllUsers}`)
  }
  getTaskDetails(taskId: string) {
    return this.http.get<any>(`${environment.baseUrl}${ApiPaths.GetTaskDetails}${taskId}`)
  }

  createNewTask(fromData: any) {
    return this.http.post<any>(`${environment.baseUrl}${ApiPaths.AddTask}`, fromData)
  }
  updateTask(fromData: any, taskId: string) {
    return this.http.put<any>(`${environment.baseUrl}${ApiPaths.EditTask}${taskId}`, fromData)
  }


  deleteTask(taskId: string) {
    return this.http.delete<any>(`${environment.baseUrl}${ApiPaths.DeleteTask}${taskId}`)
  }
}
