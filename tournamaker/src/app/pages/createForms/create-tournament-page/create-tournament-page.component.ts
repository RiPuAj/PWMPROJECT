import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { FbTournamentService, Tournament } from '../../../services/fbTournamentService/fb-tournament.service';
import { Router } from '@angular/router';
import {CommonModule, NgIf} from '@angular/common';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-create-torneo',
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './create-tournament-page.component.html',
  styleUrls: ['./create-tournament-page.component.css'],
})
export class CreateTournamentPageComponent {
  tournament: Tournament = {
    name: '',
    date: '',
    place: '',
    organizer: '',
    description: '',
    entry_tax: '',
    prize_pool: '',
    teams_num: 0,
    teams: [],
  };

  constructor(private tournamentService: FbTournamentService, private router: Router, private AuthService: AuthService) {}

  cancel() {
    this.router.navigate(['/']);
  }

  private formatDate(dateString: string): string {
    const parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  private formatEntryTax(value: number): string {
    return `€${value.toFixed(2).replace('.', ',')}`;
  }

  async onFormSubmit(form: NgForm) {
    if (form.valid) {
      try {
        const rawDate = this.tournament.date;

        if (rawDate) {
          const formattedDate = this.formatDate(rawDate);                 //Formato fecha: DD/MM/YYYY
          this.tournament.date = formattedDate;
        } else {
          console.error("La fecha de inicio es undefined");
        }

        if (this.tournament.entry_tax !== undefined && this.tournament.entry_tax !== '') {
          const entryTaxNumber = parseFloat(this.tournament.entry_tax.toString());        //Formato tasa de ingreso: €X,xx
          this.tournament.entry_tax = this.formatEntryTax(entryTaxNumber);
        }

        const user = this.AuthService.getUser();
        if (user && user.name){
          this.tournament.organizer = user.name;
        } else{
          this.router.navigate(['/login']);
        }

        const createdTournament = await this.tournamentService.create(this.tournament);
        this.router.navigate(['/tournament-view/' + createdTournament.id]);
      } catch (error) {
        console.error('Error al crear el torneo:', error);
        alert('Hubo un error al crear el torneo. Inténtalo de nuevo.');
      }
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}
