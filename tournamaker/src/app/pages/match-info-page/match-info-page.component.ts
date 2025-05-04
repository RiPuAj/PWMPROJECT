import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FbMatchService, Match } from '../../services/fbMatchService/fb-match.service';
import { FbTournamentService, Tournament } from '../../services/fbTournamentService/fb-tournament.service';
import { FbTeamService, Team } from '../../services/fbTeamService/fb-team.service';
import { AuthService } from '../../services/authService/auth.service';
import { NgIf } from '@angular/common';
import {routes} from '../../app.routes';

@Component({
  selector: 'app-match-info-page',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './match-info-page.component.html',
  styleUrl: './match-info-page.component.css'
})
export class MatchInfoPageComponent implements OnInit {
  match?: Match;
  tournament?: Tournament;
  loading = true;
  isAlreadyParticipant = false;
  teams: Team[] | undefined;


  constructor(
    private route: ActivatedRoute,
    private matchService: FbMatchService,
    private tournamentService: FbTournamentService,
    private teamService: FbTeamService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.matchService.getById(id).subscribe({
      next: (data) => {
        if (data && data.id) {
          this.match = data;

          const userId = this.authService.getUser()?.name;
          if (!userId) this.router.navigate(['/login']);
          this.isAlreadyParticipant = !!(userId && this.match.participants.includes(userId));

          this.loading = false;
        } else {
          this.loadTournament(id);
        }
      },
      error: () => this.loadTournament(id),
    });
  }

  private loadTournament(id: string) {
    const userId = this.authService.getUser()?.name;
    if (!userId) this.router.navigate(['/login']);
    this.tournamentService.getById(id).subscribe({
      next: (data) => {
        if (data && data.id) {
          this.tournament = data;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  async joinMatch() {
    if (!this.match) return;

    const user = this.authService.getUser();
    if (!user || !user.name) return;

    const updatedParticipants: string[] = [...this.match.participants, user.name];

    await this.matchService.update(this.match.id!, { participants: updatedParticipants });
    this.router.navigate(['/match-view', this.match.id!]);
  }

  loadUserTeams() {
    const currentUser = this.authService.getUser();
    if (!currentUser || !currentUser.name) return;

    this.teamService.getTeamsByCreator(currentUser.name).subscribe(teams => {
      this.teams = teams;
    });
  }

  async joinTournament(team: Team) {
    if (!this.tournament || !team) return;
    if ((this.tournament.teams || []).includes(<string>team.id)) return;

    const updatedTeams = [...(this.tournament.teams || []), team.id!];
    await this.tournamentService.update(this.tournament.id!, { teams: updatedTeams });

    if (team.id) {
      const updatedTorneos = [...(team.torneos || []), this.tournament.id!];
      await this.teamService.update(team.id, {torneos: updatedTorneos});
    }

    this.router.navigate(['/tournament-view', this.tournament.id!]);

  }


}
