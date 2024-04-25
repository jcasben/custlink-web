import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LinkComponent} from "../link/link.component";
import {User} from "../user/User";
import {environment} from "../../enviroments/environment";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    LinkComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  authService = inject(AuthService);
  http = inject(HttpClient);
  router = inject(Router);
  serverUrl = environment.apiBaseUrl;

  logout(): void {
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
    this.router.navigateByUrl('/login').then();
  }

  ngOnInit(): void {
    this.http.get(`${this.serverUrl}/users/user`)
      .subscribe({
        next: (response) => {
          console.log('response', response as User);
          this.authService.currentUserSig.set(response as User);
        },
        error: () => {
          this.authService.currentUserSig.set(null);
        },
      });
  }
}
