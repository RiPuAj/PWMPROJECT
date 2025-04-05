import { Routes } from '@angular/router';
import {LoginComponent} from './pages/forms/login/login.component';
import {LandingComponent} from './pages/landing/landing.component';
import {RegisterFormComponent} from './pages/forms/register-form/register-form.component';

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: LandingComponent },
  { path: "register", component: RegisterFormComponent }
];
