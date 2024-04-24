import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  authService = inject(AuthService);
  http = inject(HttpClient);
  router = inject(Router);

  logout(): void {
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
    this.router.navigateByUrl('/login').then();
  }
}
