import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangeUsersRoutingModule } from './mange-users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { UsersListComponent } from './users-list/users-list.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    CommonModule,
    MangeUsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    SharedMaterialModule,
    ToastrModule,
    NgxPaginationModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    MangeUsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    SharedMaterialModule,
    ToastrModule,
    NgxPaginationModule,
    TranslateModule
  ]
})
export class MangeUsersModule { }
