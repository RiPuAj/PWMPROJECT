import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/authService/auth.service';
import {User} from '../../services/fbUserService/fb-user.service';



@Component({
  selector: 'app-navbar',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  user: User | null = null;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      console.log('this.authService', JSON.stringify(this.authService));
      this.user = this.authService.getUser();
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get username(): string {
    return this.user?.username ?? '';
  }

  get avatar(): string {
    return this.user?.avatar?.trim()
      ? this.user.avatar
      : 'assets/images/default-featured-image.jpg';
  }

}
