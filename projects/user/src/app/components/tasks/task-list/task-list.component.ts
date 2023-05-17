import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'projects/user/src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core/public_api';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  currentLang!: string;
  userId: any;
  searchParams: any;
  userTasks!: any[];
  totalTasksItems!: number;
  errorMsg: string = ''
  imgSrc: string = environment.baseUrl;
  constructor(
    private taskService: TasksService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {
    if ('userId' in localStorage) {
      this.userId = localStorage.getItem('userId')
    }
    this.searchParams = {
      limit: 10,
      page: 1,
      status: 'In-Progress'
    }
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang
    })
  }

  ngOnInit(): void {
    this.getUserTasks();
  }
  getUserTasks() {
    this.taskService.getUserTasks(this.searchParams, this.userId).subscribe((res: any) => {
      this.userTasks = res.tasks;
      this.totalTasksItems = res.tasks.length;
    }, (err: any) => {
      this.userTasks = [];
      this.toastr.error(err.error.message, 'Error ')
      this.errorMsg = err.error.message;
    })
  }
  pageChange(event: any) {
    this.searchParams.page = event;
    this.getUserTasks();
  }

  completeTask(taskId: string) {
    this.taskService.completeTask(taskId).subscribe(res => {
      this.toastr.success(res.massage, 'Success');
      this.getUserTasks();
    })
  }
}
