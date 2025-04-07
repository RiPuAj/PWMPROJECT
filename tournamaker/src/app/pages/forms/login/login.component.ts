import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {User} from '../../../models/user.model';


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

  usersFromJSON: any[] = [];


  onFormSubmit(userForm: NgForm) {

    console.log(userForm.controls['email'].value);
  }
}


