import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {User} from '../../../models/user.model';
import {NgIf} from '@angular/common';
import {UserService} from '../../../services/userService/user.service';
import {AuthService} from '../../../services/authService/auth.service';
import {CommonModule} from '@angular/common';

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

  constructor(private userService: UserService, private authService: AuthService) {}

  registerUser: User = {
    id: 0,
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

  onFormSubmit(registerForm: NgForm){

    if(registerForm.valid){
      this.registerUser = {
        id: 1003,
        username: this.formUser.username,
        name: this.formUser.name,
        email: this.formUser.email,
        password: this.formUser.password,
        avatar: this.formUser.avatar
      };

      console.log(this.registerUser.name);
      this.userService.createUser(this.registerUser).subscribe()
    }


  }
}
