import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { UserList } from '../../models/user-list.model';
import { DatePipe } from '@angular/common';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  // taskId!: string;
  updateForm: FormGroup | any;
  isFormSubmitted: boolean = false;
  minDate = new Date();
  totalItems!: number;
  users!: UserList[];
  uuidValue!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private taskId: string,
    private matDialogRef: MatDialogRef<TaskEditComponent>,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private service: TasksService,
  ) {
    this.uuidValue = UUID.UUID();
  }

  ngOnInit(): void {
    this.getTaskById();
    this.getAllUsers();
    this.updateForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      deadline: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }

  getTaskById() {
    this.service.getTaskDetails(this.taskId).subscribe(res => {
      this.updateForm.patchValue({
        title: res.tasks.title,
        description: res.tasks.description,
        image: res.tasks.image,
        deadline: new Date(res.tasks.deadline.split('-').reverse().join('-')).toISOString(),
        // deadline: this.datePipe.transform(new Date(res.tasks.deadline), 'mm-dd-yyyy'),
        userId: res.tasks.userId
      });
    }, error => {
      this.toastr.error(error.error.message)
    })
  }
  /**
   * function used to get list of users
   */
  getAllUsers() {
    this.service.getAllUsers().subscribe(res => {
      this.users = res.users;
      this.totalItems = res.totalItems;
    }, err => {
      this.toastr.error(err.error.message);
    })
  }
  /**
  * function used to select file
  */
  selectedFile(event: any) {
    this.updateForm.get('image').setValue(event.target.files[0])
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.updateForm.invalid)
      return;
    const formData = new FormData();
    formData.append('title', this.updateForm.get('title').value);
    formData.append('description', this.updateForm.get('description').value);
    formData.append('deadline', moment(this.updateForm.value.deadline).format('DD-MM-YYYY'));
    formData.append('userId', this.updateForm.get('userId').value);
    formData.append('image', this.updateForm.get('image').value, this.uuidValue + this.updateForm.get('image').value.name);
    this.service.updateTask(formData, this.taskId).subscribe(res => {
      this.toastr.success(res.massage, 'Success');
      this.matDialogRef.close(true);
    }, err => {
      this.matDialogRef.close();
      this.toastr.error(err.error.message, 'Error');
    })
  }

}
