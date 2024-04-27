import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {User} from "../user/User";
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);
  http = inject(HttpClient);
  serverUrl = environment.apiBaseUrl;


  logout(): void {
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
    this.router.navigateByUrl('').then();
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
          localStorage.setItem('token', '');
        },
      });
  }
}
