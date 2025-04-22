import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Match } from '../../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matchesSubject = new BehaviorSubject<Match[]>([]);
  matches$ = this.matchesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMatches();
  }

  private loadMatches(): void {
    this.http.get<Match[]>('/assets/mocks/MOCK_MATCHES.json').subscribe(data => {
      this.matchesSubject.next(data);
    });
  }

  getMatches(): Observable<Match[]> {
    return this.matches$;
  }

  updateMatches(newMatches: Match[]) {
    this.matchesSubject.next(newMatches);
  }

  createMatch(){

  }

  deleteMatch(){

  }
}
