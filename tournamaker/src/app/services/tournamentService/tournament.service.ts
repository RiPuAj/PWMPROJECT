import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tournament } from '../../models/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private tournamentsSubject = new BehaviorSubject<Tournament[]>([]);
  tournaments$ = this.tournamentsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTournaments();
  }

  private loadTournaments(): void {
    this.http.get<Tournament[]>('/assets/mocks/MOCK_TOURNAMENT.json').subscribe(data => {
      this.tournamentsSubject.next(data);
    });
  }

  getTournaments(): Observable<Tournament[]> {
    return this.tournaments$;
  }

  updateTournaments(newTournaments: Tournament[]) {
    this.tournamentsSubject.next(newTournaments);
  }

  createTournament() {

  }

  deleteTournament() {

  }
}
