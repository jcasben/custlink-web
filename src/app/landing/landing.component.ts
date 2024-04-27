import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-landing',
  standalone: true,
    imports: [
        RouterLink,
        RouterOutlet,
        RouterLinkActive,
        HeaderComponent
    ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {}
