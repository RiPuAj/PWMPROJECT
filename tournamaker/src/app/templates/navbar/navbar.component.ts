import {Component, NgModule} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  isLoggedIn = false;
}
