import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../enviroments/environment";
import {AuthService} from "../auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {AuthResponse} from "../auth/AuthResponse";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private serverUrl = environment.apiBaseUrl;
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    this.http.post(
      `${this.serverUrl}/auth/register`,
      this.form.getRawValue(),
    ).subscribe(response => {
      console.log('response', response as AuthResponse);
      localStorage.setItem('token', (response as AuthResponse).token);
      this.authService.currentUserSig.set(this.form.getRawValue());
      this.router.navigateByUrl('/dashboard').then();
    });
  }
}
