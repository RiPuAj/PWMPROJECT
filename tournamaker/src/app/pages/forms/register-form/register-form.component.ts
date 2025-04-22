import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {User} from '../../../models/user.model';
import {NgIf} from '@angular/common';
import {UserService} from '../../../services/userService/user.service';
import {AuthService} from '../../../services/authService/auth.service';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [
    FormsModule,
    NgIf,
    CommonModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {}

  registerUser: User = {
    username: "",
    name: "",
    email: "",
    password: "",
    avatar: ""
  }

  formUser = {
    id: 0,
    username: "",
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    avatar: ""
  }

  showPassword: boolean = false;
  showRepeatPassword: boolean = false;

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'repeatPassword') {
      this.showRepeatPassword = !this.showRepeatPassword;
    }
  }

  isPasswordMismatch(): boolean {
    console.log("isPasswordMismatch");
    return this.formUser.password !== this.formUser.repeatPassword;
  }

  onFormSubmit(registerForm: NgForm) {
    if (registerForm.valid && !this.isPasswordMismatch()) {
      this.registerUser = {
        username: this.formUser.username,
        name: this.formUser.username,
        email: this.formUser.email,
        password: this.formUser.password,
        avatar: this.formUser.avatar
      };

      this.userService.createUser(this.registerUser).subscribe((createdUser: User) => {
        this.authService.setUser(createdUser);
        window.location.href = '/';
      });
    } else if (this.isPasswordMismatch()) {
      alert('Las contraseñas no coinciden.');
    }
  }
}
