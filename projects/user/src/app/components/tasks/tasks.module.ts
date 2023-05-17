import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TasksAdminRoutingModule } from './tasks-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { SharedMaterialModule } from '../../shared-material/shared-material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { TaskDetailsComponent } from './task-details/task-details.component';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    TasksAdminRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule,
    SharedMaterialModule,
    NgxPaginationModule,
    TranslateModule,
  ]
})
export class TasksModule { }
