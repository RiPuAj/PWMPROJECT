import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/userService/user.service';
import {AuthService} from '../../../services/authService/auth.service';


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
    id: 0,
    username: "",
    name: "",
    email: "",
    password: "",
    avatar: ""
  }

  users: User[] = [];

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onFormSubmit(userForm: NgForm) {
    console.log(this.authService.isLoggedIn());
    if (userForm.valid) {
      this.userService.loginUser(this.user.username, this.user.password).subscribe((res) => {
        if (res.length > 0) {
          console.log("✅ Login exitoso:", res[0]);
          const user = res[0];
          this.authService.setUser(user)
        } else {
          console.error("❌ Usuario o contraseña incorrectos");
          alert("Credenciales incorrectas");
          this.authService.logout();
        }
      });
    }

  }
}


