import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {FbUserService, User} from '../services/fbUserService/fb-user.service';
import {AsyncPipe} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-all-users',
  imports: [
    AsyncPipe, FormsModule, CommonModule
  ],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {
  users$!: Observable<User[]>;

  constructor(private userSvc: FbUserService) {}

  ngOnInit() {
    this.users$ = this.userSvc.list();
  }
}
