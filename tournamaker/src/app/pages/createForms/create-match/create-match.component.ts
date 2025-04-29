import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FbMatchService, Match } from '../../../services/fbMatchService/fb-match.service';
import { CommonModule } from '@angular/common';
import { FbTeamService } from '../../../services/fbTeamService/fb-team.service';
import {FbTournamentService, Tournament} from '../../../services/fbTournamentService/fb-tournament.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CreateMatchComponent {
  match: Match = {
    date: '',
    hour: '',
    place: '',
    name: '',
    description: '',
    entry_tax: '',
    prize_pool: '',
    organizer: '',
    teams: [],
    participants_num: 0,
    image: '',
    tournament: '',
    participants: [],
  };

  tournamentId: string = '';
  teams: any[] = [];

  constructor(
    private fbMatchService: FbMatchService,
    private fbTeamService: FbTeamService,
    private fbTournamentService: FbTournamentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId') || '';
    this.fbTournamentService.getTournamentById(this.tournamentId).subscribe((tournament: Tournament) => {
      const teamIds = tournament.teams;
      if (teamIds) {
        this.loadTeams(teamIds);
      }
    });
  }

  loadTeams(teamIds: string[]) {
    this.teams = [];
    teamIds.forEach((teamId) => {
      this.fbTeamService.getById(teamId).subscribe((team) => {
        if (!this.teams.find(t => t.id === team.id)) {
          this.teams.push(team);
        }
      });
    });
  }

  async onFormSubmit(form: NgForm) {
    if (form.valid) {
      const dateInput = (document.getElementById('date') as HTMLInputElement)?.value;
      const hourInput = (document.getElementById('hour') as HTMLInputElement)?.value;

      if (dateInput && hourInput) {
        this.match.date = this.formatDate(dateInput);
        this.match.hour = hourInput;
      } else {
        console.error('Fecha y hora son obligatorias');
        return;
      }

      const nameInput = (document.getElementById('matchName') as HTMLInputElement)?.value;
      const placeInput = (document.getElementById('place') as HTMLInputElement)?.value;
      const entryTaxInput = (document.getElementById('entryTax') as HTMLInputElement)?.value;
      const descriptionInput = (document.getElementById('descripcion') as HTMLTextAreaElement)?.value;
      const participantsNumInput = (document.getElementById('participantsNum') as HTMLInputElement)?.value;
      const organizerInput = (document.getElementById('organizer') as HTMLInputElement)?.value;
      const prizePoolInput = (document.getElementById('prizePool') as HTMLInputElement)?.value;
      const imageInput = (document.getElementById('image') as HTMLInputElement)?.value;

      this.match.name = nameInput;
      this.match.place = placeInput;
      this.match.entry_tax = entryTaxInput || undefined;
      this.match.description = descriptionInput || undefined;
      this.match.participants_num = Number(participantsNumInput) * 2;
      this.match.prize_pool = prizePoolInput || undefined;
      this.match.image = imageInput || undefined;
      this.match.organizer = organizerInput || undefined;

      try {
        const createdMatch = await this.fbMatchService.create(this.match);
        this.router.navigate(['/match-view/' + createdMatch.id]);
      } catch (error) {
        console.error('Error al crear el partido', error);
      }
    } else {
      console.error('Formulario no válido');
    }
  }

  onCancel() {
    if (!this.tournamentId) {
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/tournament-view/' + this.tournamentId]);
    }

  }

  private formatDate(dateString: string): string {
    const parts = dateString.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
}
