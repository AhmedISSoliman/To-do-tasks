import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'projects/user/src/environments/environment';
import { ApiPath } from 'projects/user/src/environments/urls';
import { SearchParamsList } from '../../models/search-params-list.model';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getUserTasks(searchParams: SearchParamsList, id: string): any {
    let params = new HttpParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params = params.append(key, value)
    });
    return this.http.get<any>(`${environment.baseUrl}${ApiPath.GetUserTask}${id}`, { params });
  }

  completeTask(id: String) {
    return this.http.put<any>(`${environment.baseUrl}${ApiPath.CompleteTask}`, { id })
  }
  getTaskDetails(taskId: string) {
    return this.http.get<any>(`${environment.baseUrl}${ApiPath.GetTaskDetails}${taskId}`)
  }
}
