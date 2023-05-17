import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { ToastrModule } from 'ngx-toastr';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskDeleteComponent } from './components/task-delete/task-delete.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TasksListComponent,
    TaskAddComponent,
    TaskEditComponent,
    TaskDeleteComponent
  ],
  imports: [
    CommonModule,
    TasksAdminRoutingModule,
    ReactiveFormsModule, FormsModule,
    ToastrModule,
    NgxSpinnerModule,
    SharedMaterialModule,
    NgxPaginationModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    TasksAdminRoutingModule,
    ReactiveFormsModule, FormsModule,
    ToastrModule,
    NgxSpinnerModule,
    SharedMaterialModule,
    NgxPaginationModule,
    TranslateModule
  ],
  providers: [DatePipe]
})
export class TasksAdminModule { }
