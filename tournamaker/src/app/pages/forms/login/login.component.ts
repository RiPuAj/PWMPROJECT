import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/userService/user.service';
import {AuthService} from '../../../services/authService/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  user: User = {
    username: "",
    name: "",
    email: "",
    password: "",
    avatar: ""
  }

  users: User[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onFormSubmit(userForm: NgForm) {

    if (userForm.valid) {

      this.userService.loginUser(this.user.email, this.user.password).subscribe((res) => {
        if (res.length > 0) {
          console.log("Intentando login con:", this.user.email, this.user.password);
          console.log("✅ Login exitoso:", res[0]);
          const user = res[0];
          this.authService.setUser(user)
          window.location.href = '/';
        } else {
          console.error("❌ Usuario o contraseña incorrectos");
          alert("Credenciales incorrectas");
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
//ng generate service <ruta con nombre del servicio>


