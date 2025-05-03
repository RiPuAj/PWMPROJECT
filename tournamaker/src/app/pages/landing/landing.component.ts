import { Component, OnInit } from '@angular/core';
import { FbTournamentService, Tournament } from '../../services/fbTournamentService/fb-tournament.service';
import { FbMatchService, Match } from '../../services/fbMatchService/fb-match.service';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LandingComponent implements OnInit {
  tournaments: Tournament[] = [];
  matches: Match[] = [];

  constructor(
    private tournamentService: FbTournamentService,
    private matchService: FbMatchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tournamentService.list().subscribe(tournaments => {
      this.tournaments = tournaments;
    });

    this.matchService.list().subscribe(matches => {
      this.matches = matches.filter(match => !match.tournament);
    });
  }

  goToMatch(id: string) {
    this.router.navigate(['/match-info', id]);
  }

  goToAllTournaments() {
    this.router.navigate(['/all-tournaments']);
  }

  goToAllMatches() {
    this.router.navigate(['/all-matches']);
  }
}
