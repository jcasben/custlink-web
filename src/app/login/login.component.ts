import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    // Implementar la lógica de inicio de sesión aquí
  }
}
