import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LinkComponent} from "../link/link.component";
import {User} from "../user/User";
import {environment} from "../../enviroments/environment";
import {NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [
        RouterLink,
        LinkComponent,
        NgOptimizedImage,
        HeaderComponent,
        RouterOutlet,
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  authService = inject(AuthService);
  http = inject(HttpClient);
  router = inject(Router);
}
