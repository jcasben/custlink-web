import {Component, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../enviroments/environment";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthResponse} from "../auth/AuthResponse";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {User} from "../user/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  private serverUrl = environment.apiBaseUrl;

  onSubmit(): void {
    this.http.post(
      `${this.serverUrl}/auth/login`,
      this.form.getRawValue(),
    ).subscribe(response => {
      console.log('response', response as AuthResponse);
      localStorage.setItem('token', (response as AuthResponse).token);
      this.authService.currentUserSig.set(this.form.getRawValue() as User)
      this.router.navigateByUrl('/dashboard').then();
    });
  }
}
