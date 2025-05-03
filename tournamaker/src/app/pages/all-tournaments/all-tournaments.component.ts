import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbTournamentService, Tournament } from '../../services/fbTournamentService/fb-tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-tournaments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-tournaments.component.html',
  styleUrl: './all-tournaments.component.css',
})
export class AllTournamentsComponent implements OnInit {
  tournaments: Tournament[] = [];
  pageSize = 6;
  currentPage = 1;

  constructor(private fbTournamentService: FbTournamentService, private router: Router) {}

  ngOnInit(): void {
    this.fbTournamentService.list().subscribe((data) => {
      this.tournaments = data;
    });
  }

  get paginatedTournaments(): Tournament[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.tournaments.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.tournaments.length / this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  goToMatch(id: string) {
    this.router.navigate(['/match-info', id]);
  }
}
