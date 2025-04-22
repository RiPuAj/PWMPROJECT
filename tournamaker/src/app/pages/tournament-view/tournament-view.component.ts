import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TeamService } from '../../services/teamService/team.service';
import { MatchService } from '../../services/matchService/match.service';
import { TournamentService } from '../../services/tournamentService/tournament.service';

@Component({
  selector: 'app-tournament-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-view.component.html',
  styleUrls: ['./tournament-view.component.css']
})
export class TournamentViewComponent implements OnInit {
  matches: any[] = [];
  tournaments: any[] = [];
  teams: any[] = [];
  lastMatches: any[] = [];
  upcomingMatches: any[] = [];

  constructor(
    private teamService: TeamService,
    private matchService: MatchService,
    private tournamentService: TournamentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.matchService.getMatches().subscribe(matches => {
      this.matches = matches;
      this.procesarDatos();
    });

    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });

    this.tournamentService.getTournaments().subscribe(tournaments => {
      this.tournaments = tournaments;
    });
  }

  procesarDatos(): void {
    const today = new Date();

    const sortedMatches = this.matches.sort((a, b) =>
      new Date(a.date.split('/').reverse().join('-')).getTime() -
      new Date(b.date.split('/').reverse().join('-')).getTime()
    );

    this.lastMatches = sortedMatches
      .filter(m => new Date(m.date.split('/').reverse().join('-')) < today)
      .slice(-3).reverse();

    this.upcomingMatches = sortedMatches
      .filter(m => new Date(m.date.split('/').reverse().join('-')) >= today)
      .slice(0, 3);
  }

  getTeamImage(teamName: string): string {
    const team = this.getTeamByName(teamName);
    return team?.image || 'default_image_url';
  }

  getTeamName(teamName: string): string {
    const team = this.getTeamByName(teamName);
    return team?.name || 'Equipo desconocido';
  }


  getTeamByName(name: string) {
    return this.teams.find(team => {
      return team.name.trim().toLowerCase() === name.trim().toLowerCase();
    });
  }

  goToMatch(id: string): void {
    this.router.navigate(['/match-view', id]);
  }
}
