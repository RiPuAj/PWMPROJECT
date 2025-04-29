import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FbTeamService } from '../../services/fbTeamService/fb-team.service';
import { FbMatchService } from '../../services/fbMatchService/fb-match.service';
import { FbTournamentService } from '../../services/fbTournamentService/fb-tournament.service';

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
  currentTournamentId: string = '';
  currentTournament: any = null;

  constructor(
    private fbTeamService: FbTeamService,
    private fbMatchService: FbMatchService,
    private fbTournamentService: FbTournamentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentTournamentId = this.route.snapshot.paramMap.get('id') || '';

    this.fbTournamentService.list().subscribe(tournaments => {
      this.tournaments = tournaments || [];
      this.currentTournament = this.tournaments.find(t => t.id === this.currentTournamentId);
    });

    this.fbTeamService.list().subscribe(teams => {
      this.teams = teams || [];
    });

    this.fbMatchService.list().subscribe(matches => {
      this.matches = (matches || []).filter(m => m.tournament === this.currentTournamentId);
      this.procesarDatos();
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
      .slice(-3)
      .reverse();

    this.upcomingMatches = sortedMatches
      .filter(m => new Date(m.date.split('/').reverse().join('-')) >= today)
      .slice(0, 3);
  }

  getTeamById(id: string) {
    if (!id) return null;
    return this.teams.find(team => team.id === id);
  }

  goToCreateMatch() {
    this.router.navigate(['/create-match', this.currentTournamentId]);
  }

  getTeamImage(teamId: string): string {
    const team = this.getTeamById(teamId);
    return team?.image || 'default_image_url';
  }

  getTeamName(teamId: string): string {
    const team = this.getTeamById(teamId);
    return team?.name || 'Equipo desconocido';
  }

  getTeamPlayers(teamId: string): string[] {
    const team = this.getTeamById(teamId);
    return team?.participants || [];
  }

  goToMatch(id: string): void {
    this.router.navigate(['/match-view', id]);
  }
}
