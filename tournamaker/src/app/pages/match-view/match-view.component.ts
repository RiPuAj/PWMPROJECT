import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FbMatchService, Match } from '../../services/fbMatchService/fb-match.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.css']
})
export class MatchViewComponent implements OnInit {
  matchId!: string;
  match?: Match;
  loading: boolean = true;
  error: string = '';

  private route = inject(ActivatedRoute);
  private matchService = inject(FbMatchService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (!idParam) {
        this.error = 'ID de partido no proporcionado.';
        this.loading = false;
        return;
      }

      this.matchId = idParam;

      this.matchService.getById(this.matchId).subscribe({
        next: (match) => {
          this.match = match;
          this.loading = false;
        },
        error: () => {
          this.error = 'Partido no encontrado.';
          this.loading = false;
        }
      });
    });
  }
}
