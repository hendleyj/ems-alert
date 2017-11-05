import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateCaseComponent } from './case/create-case/create-case.component';
import { DispatcherRegisterComponent } from './login/register/register.component';

const myRoutes: Routes = [
  // Default
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Home Page
  { path: 'home', component: CreateCaseComponent },

  // Registration Page
  { path: 'register', component: DispatcherRegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(myRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
