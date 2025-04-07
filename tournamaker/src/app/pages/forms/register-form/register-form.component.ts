import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {User} from '../../../models/user.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register-form',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
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

  onFormSubmit(userForm: NgForm){

  }
}
