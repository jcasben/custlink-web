import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../enviroments/environment";
import {RegisterRequest} from "./RegisterRequest";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private serverUrl = environment.apiBaseUrl;
  fb = inject(FormBuilder);
  http = inject(HttpClient);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    console.log(this.form.getRawValue());
    this.http.post<{ user: RegisterRequest }>(
      `${this.serverUrl}/auth/register`,
      this.form.getRawValue(),
    ).subscribe(response => {
      console.log('response', response);
    });
  }
}
