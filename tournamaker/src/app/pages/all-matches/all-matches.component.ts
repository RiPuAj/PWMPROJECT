import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbMatchService, Match } from '../../services/fbMatchService/fb-match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-matches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-matches.component.html',
  styleUrl: './all-matches.component.css',
})
export class AllMatchesComponent implements OnInit {
  matches: Match[] = [];
  pageSize = 6;
  currentPage = 1;

  constructor(private fbMatchService: FbMatchService, private router: Router) {}

  ngOnInit(): void {
    this.fbMatchService.list().subscribe((data) => {
      this.matches = data.filter((match) => !match.tournament || match.tournament.trim() === '');
    });
  }

  get paginatedMatches(): Match[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.matches.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.matches.length / this.pageSize);
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
