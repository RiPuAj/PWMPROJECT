import { Routes } from '@angular/router';
import {LoginComponent} from './pages/forms/login/login.component';
import {LandingComponent} from './pages/landing/landing.component';

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: LandingComponent }
];
