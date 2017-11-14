import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainDashboardComponent } from './dashboard/dashboard.component';
import { DispatcherRegisterComponent } from './dispatcher-login/register/register.component';
import { DispatcherLoginComponent } from './dispatcher-login/login/login.component';

const myRoutes: Routes = [
  // Default
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Login Page
  { path: 'login', component: DispatcherLoginComponent },

  // Home Page
  { path: 'dash', component: MainDashboardComponent },

  // Registration Page
  { path: 'register', component: DispatcherRegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(myRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
