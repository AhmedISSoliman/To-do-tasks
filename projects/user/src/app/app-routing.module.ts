import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
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
    path: 'register',
    canActivate: [CurrentUserCheckGuard],
    component: RegisterComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tasks',
        loadChildren: () => import('./components/tasks/tasks.module').then(m => m.TasksModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
