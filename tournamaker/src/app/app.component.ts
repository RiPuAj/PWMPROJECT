import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './templates/navbar/navbar.component';
import {FooterComponent} from './templates/footer/footer.component';
import {FormsModule} from '@angular/forms';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
  title = 'tournamaker';
}
