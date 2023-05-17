import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../services/tasks.service';
import { environment } from 'projects/admin/src/environments/environment';
import { UserList } from '../../models/user-list.model';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html',
  styleUrls: ['./task-delete.component.scss']
})
export class TaskDeleteComponent implements OnInit {
  @Output() taskDetails!: any;
  imgSrc: string = environment.baseUrl;
  constructor(
    private matDialogRef: MatDialogRef<TaskDeleteComponent>,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private service: TasksService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    // this.getTaskById();
  }
  // getTaskById() {
  //   this.service.getTaskDetails(this.taskId).subscribe(res => {
  //     this.taskDetails = res.tasks;
  //     // res.tasks.userId = this.users?.find(user => res.tasks?.userId === user?._id)?.username;
  //   }, error => {
  //     this.toastr.error(error.error.message)
  //   })
  // }
  deleteTask() {
    this.service.deleteTask(this.taskDetails._id).subscribe(res => {
      this.matDialogRef.close(true);
      this.toastr.success(this.translateService.instant('TaskDeletedSuccessfully'), this.translateService.instant('Success'));
    }, error => {
      this.matDialogRef.close();
      this.toastr.error(error.error.message, 'Error');
    })
  }
}
