import {Component, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../enviroments/environment";
import {LoginRequest} from "./LoginRequest";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

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

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  private serverUrl = environment.apiBaseUrl;

  onSubmit(): void {
    console.log(this.form.getRawValue())
    this.http.post<{ user: LoginRequest }>(
      `${this.serverUrl}/auth/login`,
      this.form.getRawValue(),
    ).subscribe(response => {
      console.log('response', response);
    })
  }

}
