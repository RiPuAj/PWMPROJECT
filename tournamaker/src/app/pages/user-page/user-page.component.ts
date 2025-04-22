import { Component } from '@angular/core';
import {AuthService} from '../../services/authService/auth.service';
import {UserService} from '../../services/userService/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-page',
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {}

  logOut(){
    console.log("logOut");
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
