import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUserCheckGuard } from './guards/current-user-check.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [CurrentUserCheckGuard],
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tasks',
        loadChildren: () => import('./tasks-admin/tasks-admin.module').then(m => m.TasksAdminModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./mange-users/mange-users.module').then(m => m.MangeUsersModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
