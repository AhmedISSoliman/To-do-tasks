
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { SearchParamsList } from './../../models/tasks-search-list-params.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddComponent } from '../task-add/task-add.component';
import { UserList } from '../../models/user-list.model';
import { environment } from 'projects/admin/src/environments/environment';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { TaskDeleteComponent } from '../task-delete/task-delete.component';
import * as moment from 'moment';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'title', 'user', 'deadline', 'status', 'actions'];
  searchParam!: any;
  tasks!: any[];
  totalTasksItems!: number;

  users!: UserList[];
  // users!: any[];
  totalUserItems!: number;
  status: any[] = [];
  imgSrc: string = environment.baseUrl;
  timeOutId!: any;
  constructor(
    private tasksService: TasksService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.searchParam = {
      limit: 10,
      page: 1,
      status: '',
      toDate: '',
      fromDate: '',
      userId: '',
      keyword: ''
    };
    this.status = [
      { name: "In-Progress" }, { name: 'Complete' }]
  }

  ngOnInit(): void {
    this.getAllTasks();
    this.getAllUsers();
  }

  getAllTasks() {
    this.tasksService.getAllTasks(this.searchParam).subscribe(res => {
      this.tasks = res.tasks.map(task => {
        return {
          ...task,
          user: task?.userId?.username
        }
      });
      this.totalTasksItems = res.totalItems;
      // this.tasks.forEach((element, i) => {
      //   this.status.push({ id: i, name: element.status })
      // })
    }, err => {
      // this.toastrService.error(err.error.message, 'Error');
    })
  }

  getAllUsers() {
    this.tasksService.getAllUsers().subscribe(res => {
      this.users = res.users;
      this.totalUserItems = res.totalItems;
    }, err => {
      // this.toastrService.error(err.error.message);
    })
  }

  addNewTask() {
    const dialogRef = this.dialog.open(TaskAddComponent);
    dialogRef.componentInstance.users = this.users;
    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
      if (res) {
        this.getAllTasks();
      }
    })
  }
  openUpdatePopup(taskId: string) {
    const dialgRef = this.dialog.open(TaskEditComponent, {
      data: taskId
    });
    dialgRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllTasks();
      }
    })
  }
  openDeletePopup(task: any) {
    const dialgRef = this.dialog.open(TaskDeleteComponent);
    dialgRef.componentInstance.taskDetails = task;
    dialgRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllTasks();
      }
    })
  }

  searchByKeword(event: any) {
    this.searchParam.keyword = event.target.value;
    clearInterval(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getAllTasks();
    }, 2000);
  }
  searchByUser(event: any) {
    this.searchParam.userId = event.value;
    this.getAllTasks();
  }
  searchByStatus(event: any) {
    this.searchParam.status = event.value;
    this.getAllTasks();
  }
  searchByDateRang(event: any, type: string) {
    this.searchParam[type] = moment(event.value).format('DD-MM-YYYY');
    if (type == 'toDate' && this.searchParam['toDate'] != "Invalid date") {
      this.getAllTasks();
    }
  }
  pageChange(event: any) {
    this.searchParam.page = event;
    this.getAllTasks();
  }
}
