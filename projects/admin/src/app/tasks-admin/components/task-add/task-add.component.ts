import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserList } from '../../models/user-list.model';
import { TasksService } from '../../services/tasks.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {
  createForm: FormGroup | any;
  isFormSubmitted: boolean = false;
  minDate = new Date();
  @Output() users!: UserList[];
  totalItems!: number;
  uuidValue!: string;
  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
    private tasksService: TasksService,
    public matDialogRef: MatDialogRef<TaskAddComponent>
  ) {
    this.uuidValue = UUID.UUID();
  }

  ngOnInit(): void {
    // this.getAllUsers();
    // create form
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      deadline: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }
  /**
   * function used to get list of users
   */
  // getAllUsers() {
  //   this.tasksService.getAllUsers().subscribe(res => {
  //     this.users = res.users;
  //     this.totalItems = res.totalItems;
  //   }, err => {
  //     this.toastrService.error(err.error.message);
  //   })
  // }
  /**
   * function used to select file
   */
  selectedFile(event: any) {
    let file = event.target.files[0];
    this.createForm.get('image').setValue(file);
  }
  /**
   *  submit form
   */
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.createForm.invalid)
      return;

    const formData = new FormData();
    formData.append('title', this.createForm.get('title').value);
    formData.append('description', this.createForm.get('description').value);
    formData.append('deadline', moment(this.createForm.value.deadline).format('DD-MM-YYYY'));
    formData.append('userId', this.createForm.get('userId').value);
    formData.append('image', this.createForm.get('image').value, this.uuidValue + this.createForm.get('image').value.name);
    this.tasksService.createNewTask(formData).subscribe(res => {
      this.toastrService.success(res.massage, 'Success');
      this.matDialogRef.close(true);
    }, error => {
      this.matDialogRef.close();
      this.toastrService.error(error.error.message, 'Error');
    })
  }

  /**
* used to close material dialog
*/
  onCloseCancel() {
    this.matDialogRef.close();
  }
}
