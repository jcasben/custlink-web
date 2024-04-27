import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    HeaderComponent,
    NgOptimizedImage
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {}
