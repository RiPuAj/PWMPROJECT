import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FbMatchService, Match } from '../../../services/fbMatchService/fb-match.service';
import { AuthService } from '../../../services/authService/auth.service';
import { CommonModule } from '@angular/common';
import { FbTeamService } from '../../../services/fbTeamService/fb-team.service';
import { FbTournamentService, Tournament } from '../../../services/fbTournamentService/fb-tournament.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CreateMatchComponent implements OnInit {
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
    estadoPartido: ["Sin Jugar", 0, 0],
  };

  tournamentId: string = '';
  teams: any[] = [];
  isReady = false;

  constructor(
    private fbMatchService: FbMatchService,
    private fbTeamService: FbTeamService,
    private fbTournamentService: FbTournamentService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId') || '';
    if (this.tournamentId) {
      this.match.tournament = this.tournamentId;
      this.fbTournamentService.getTournamentById(this.tournamentId).subscribe((tournament: Tournament) => {
        const teamIds = tournament.teams;
        if (teamIds) {
          this.loadTeams(teamIds);
        }
        this.isReady = true;
      });
    } else {
      this.fbTeamService.list().subscribe((teams) => {
        this.teams = teams;
        this.isReady = true;
      });
    }
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
      if (this.tournamentId) {
        this.match.tournament = this.tournamentId;
      }

      if (this.tournamentId) {
        if (!this.match.teams || this.match.teams.length < 2 || !this.match.teams[0] || !this.match.teams[1]) {
          console.error('Debes seleccionar dos equipos');
          return;
        }
      }

      if (!this.tournamentId) {
        this.match.participants_num = Number(this.match.participants_num) * 2;
      }

      const user = this.authService.getUser();
      if (user && user.name){
        this.match.organizer = user.name;
      } else{
        this.router.navigate(['/login']);
      }
      this.match.participants = [this.match.organizer];

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
    } else {
      this.router.navigate(['/tournament-view/' + this.tournamentId]);
    }
  }
}
