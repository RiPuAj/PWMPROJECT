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

  teamLeft: string[] = [];
  teamRight: string[] = [];

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

          if (match.participants) {
            const mitad = Math.ceil(match.participants.length / 2);
            this.teamLeft = match.participants.slice(0, mitad);
            this.teamRight = match.participants.slice(mitad);
          }
        },
        error: () => {
          this.error = 'Partido no encontrado.';
          this.loading = false;
        }
      });
    });
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  onDragStart(event: DragEvent, player: string) {
    event.dataTransfer?.setData('text/plain', player);
  }

  onDrop(event: DragEvent, side: 'left' | 'right') {
    event.preventDefault();

    if (this.match?.tournament) return;

    const player = event.dataTransfer?.getData('text/plain');
    if (!player) return;

    this.teamLeft = this.teamLeft.filter(p => p !== player);
    this.teamRight = this.teamRight.filter(p => p !== player);

    if (side === 'left') {
      this.teamLeft.push(player);
    } else {
      this.teamRight.push(player);
    }
  }

}

