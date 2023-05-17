import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'projects/user/src/environments/environment';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  taskId: any;
  taskDetails: any;
  imgSrc: string = environment.baseUrl;
  constructor(
    private activeRoute: ActivatedRoute,
    private taskService: TasksService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.taskId = this.activeRoute.snapshot.paramMap.get('id');
    this.getTaskDetails()
  }
  getTaskDetails() {
    this.taskService.getTaskDetails(this.taskId).subscribe(res => {
      console.log(res)
      this.taskDetails = res.tasks;
    })
  }
  completeTask(taskId: string) {
    this.taskService.completeTask(taskId).subscribe(res => {
      this.toastr.success(res.massage, 'Success');
      this.router.navigate(['tasks']);
    })
  }
}
