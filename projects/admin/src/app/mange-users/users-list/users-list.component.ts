import { Component, OnInit } from '@angular/core';
import { UserList } from '../../tasks-admin/models/user-list.model';
import { UsersService } from '../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'assignedTasks', 'tasksAssigned', 'status', 'actions'];
  searchParam: any;
  users!: UserList[];
  // users!: any[];
  totalUserItems!: number;
  timeOutId: any;
  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {
    this.searchParam = {
      page: 1,
      limit: 10,
      name: ''
    }
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUsers(this.searchParam).subscribe(res => {
      this.users = res.users;
      this.totalUserItems = res.totalItems;
    })
  }
  pageChange(event: any) {
    this.searchParam.page = event;
    this.getAllUsers();
  }
  deleteUser(userId: string, i: number) {
    if (this.users[i].assignedTasks > 0) {
      this.toastr.warning(this.translateService.instant('CanotDeleteUser'));
    }
    else {
      this.userService.deleteUser(userId).subscribe(res => {
        this.toastr.success(this.translateService.instant(res.massage), this.translateService.instant('Success'))
        this.getAllUsers();
      })
    }
  }
  changeStatus(userId: string, userStatus: string, i: number) {
    if (this.users[i].assignedTasks > 0) {
      this.toastr.warning(this.translateService.instant('CanotUpdateUserStatus'));
    }
    else {
      this.userService.changeStatus(userId, userStatus).subscribe(res => {
        this.toastr.success(this.translateService.instant(res.massage), this.translateService.instant('Success'))
        this.getAllUsers();
      })
    }
  }
  searchByName(event: any) {
    this.searchParam.name = event.target.value;
    this.searchParam.name = this.searchParam.name.charAt(0).toUpperCase() + this.searchParam.name.slice(1);
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getAllUsers();
    }, 2000);
  }
}
