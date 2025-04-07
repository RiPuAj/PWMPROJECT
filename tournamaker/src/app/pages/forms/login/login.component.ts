import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';


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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }


  onFormSubmit(userForm: NgForm) {
    if (userForm.valid) {
      console.log('valid');
    }

  }
}


