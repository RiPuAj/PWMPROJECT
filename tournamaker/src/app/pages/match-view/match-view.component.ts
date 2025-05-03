import { Component, OnInit, inject } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FbMatchService, Match } from '../../services/fbMatchService/fb-match.service';
import { FbTeamService} from '../../services/fbTeamService/fb-team.service';
import { AuthService } from '../../services/authService/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-match-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(
    private fbTeamService: FbTeamService,
    private fbMatchService: FbMatchService,
    private route: ActivatedRoute,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (!idParam) {
        this.error = 'ID de partido no proporcionado.';
        this.loading = false;
        return;
      }

      this.matchId = idParam;

      this.fbMatchService.getById(this.matchId).subscribe({
        next: (match) => {
          this.match = match;
          this.verificarEstadoAutomaticamente(match);
          this.loading = false;

          if (this.match.tournament){
            this.fbTeamService.getParticipantsByTeamId(this.match.teams[0]).forEach(
              p => {
                this.teamLeft = p;
              });
            this.fbTeamService.getParticipantsByTeamId(this.match.teams[1]).forEach(
              p => {
                this.teamRight = p;
              });
          } else {
            if (match.participants) {
              const mitad = Math.ceil(match.participants.length / 2);
              this.teamLeft = match.participants.slice(0, mitad);
              this.teamRight = match.participants.slice(mitad);
            }
          }
        },
        error: () => {
          this.error = 'Partido no encontrado.';
          this.loading = false;
        }
      });
    });
  }

  isOrganizer(): boolean {
    return this.AuthService.getUser()?.name === this.match?.organizer;
  }

  verificarEstadoAutomaticamente(match: Match) {
    const hoy = new Date();
    const fechaPartido = new Date(`${match.date}T${match.hour}`);
    if (hoy > fechaPartido && match.estadoPartido[0] === 'Sin Jugar') {
      match.estadoPartido[0] = 'Cancelado';
      this.fbMatchService.update(match.id!, {estadoPartido: match.estadoPartido});
    }
  }

  guardarMarcador() {
    if (this.match && this.match.estadoPartido[0] === 'Jugando') {
      this.fbMatchService.update(this.match.id!, {
        estadoPartido: this.match.estadoPartido
      }).then(() => alert('Marcador actualizado.'));
    }
  }

  cambiarEstado(nuevoEstado: string) {
    if (this.match) {
      this.match.estadoPartido[0] = nuevoEstado;
      if (nuevoEstado === 'Sin Jugar' || nuevoEstado === 'Cancelado') {
        this.match.estadoPartido[1] = 0;
        this.match.estadoPartido[2] = 0;
      }
      this.fbMatchService.update(this.match.id!, {
        estadoPartido: this.match.estadoPartido
      }).then(() => alert(`Estado cambiado a ${nuevoEstado}.`));
    }
  }

  allowDrop(event: DragEvent) {
    if (this.isOrganizer()) {
      event.preventDefault();
    }
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
