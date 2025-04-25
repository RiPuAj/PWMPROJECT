import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {UserService} from '../../../services/userService/user.service';
import {AuthService} from '../../../services/authService/auth.service';
import {Router} from '@angular/router';
import {FbUserService} from '../../../services/fbUserService/fb-user.service';
import {User} from '../../../services/fbUserService/fb-user.service';


@Component({
  selector: 'app-login',
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {


  constructor(
    private userService: FbUserService,
    private authService: AuthService,
    private router: Router) {}

  user: User = {
    username: "",
    name: "",
    email: "",
    password: "",
    avatar: ""
  }

  onFormSubmit(userForm: NgForm) {
    if (userForm.valid) {
      this.userService.getByEmail(this.user.email).subscribe((loginUser) => {
        if (loginUser && this.user.password === loginUser.password) {
          this.authService.setUser(loginUser);
          window.location.href = '/';
        } else {
          alert("❌ Credenciales incorrectas");
        }
      });
    }
  }
}

//https://garage.sekrab.com/posts/putting-angular-fire-firestore-library-to-use-i
//coleccion=tabla documento=dato
//npm install -g @angular/cli
//ng add @angular/fire@19 (habilitar solo Firestore, en la app, crear una nueva para el CRUD)
//mirar la guia como poner en marcha firebase
//al instalar angular/fire@19, ya se puso las cosas bien bien para el angular, no hace falta tocar el main.ts
//ng generate service <ruta con nombre del servicio>


