import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Team } from '../../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsSubject = new BehaviorSubject<Team[]>([]);
  teams$ = this.teamsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTeams();
  }

  private loadTeams() {
    this.http.get<Team[]>('/assets/mocks/MOCK_TEAMS.json').subscribe(data => {
      this.teamsSubject.next(data);
    });
  }

  getTeams(): Observable<Team[]> {
    return this.teams$;
  }

  updateTeams(newTeams: Team[]) {
    this.teamsSubject.next(newTeams);
  }

  createTeam(){

  }

  deleteTeam(){

  }
}
