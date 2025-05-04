import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { FbTeamService, Team } from '../../../services/fbTeamService/fb-team.service';
import { Router } from '@angular/router';
import {CommonModule, NgIf} from '@angular/common';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-create-team',
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent {
  team: Team = {
    name: '',
    participants: [],
    image: '',
    creador:  '',
    torneos: [],
  };

  constructor(private teamService: FbTeamService, private router: Router, private AuthService: AuthService) {}

  cancel() {
    this.router.navigate(['/user-page']);
  }

  async onFormSubmit(form: NgForm) {
    if (form.valid) {
      try {
        if (typeof this.team.participants === 'string') {
          this.team.participants= (this.team.participants as unknown as string)      //Participantes
            .split(',')
            .map(participant => participant.trim());
        }

        const user = this.AuthService.getUser();
        if (user && user.name){
          this.team.creador = user.name;
        } else{
          this.router.navigate(['/login']);
        }

        await this.teamService.create(this.team);
        this.router.navigate(['/user-page']);
      } catch (error) {
        console.error('Error al crear el equipo:', error);
        alert('Hubo un error al crear el equipo. Inténtalo de nuevo.');
      }
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}
