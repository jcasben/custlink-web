import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {LandingComponent} from "./landing/landing.component";
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
