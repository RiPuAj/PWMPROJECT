import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../../services/matchService/match.service';
import { TeamService } from '../../services/teamService/team.service';
import { Match } from '../../models/match.model';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-match-view',
  standalone: true,
  templateUrl: './match-view.component.html',
  styleUrl: './match-view.component.css'
})
export class MatchViewComponent implements OnInit {
  matchId!: number;
  match?: Match;
  teamOne?: Team;
  teamTwo?: Team;

  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (!idParam) {
        this.error = 'ID de partido no proporcionado.';
        this.loading = false;
        return;
      }

      this.matchId = +idParam;

      this.matchService.getMatches().subscribe(matches => {
        const foundMatch = matches.find(m => m.id === this.matchId);

        if (!foundMatch) {
          this.error = 'Partido no encontrado.';
          this.loading = false;
          return;
        }

        this.match = foundMatch;

        if (this.match.participants.length !== 2) {
          this.error = 'El partido no tiene dos equipos asignados.';
          this.loading = false;
          return;
        }

        const [team1Name, team2Name] = this.match.participants;

        this.teamService.getTeams().subscribe(teams => {
          this.teamOne = teams.find(t => t.name === team1Name);
          this.teamTwo = teams.find(t => t.name === team2Name);

          if (!this.teamOne || !this.teamTwo) {
            this.error = 'No se pudieron cargar los equipos.';
          }

          this.loading = false;
        });
      });
    });
  }
}
