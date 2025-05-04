import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore, query, updateDoc, where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Team {
  id?: string;
  name: string;
  image: string;
  participants: string[];
  creador: string;
  torneos: string[];
}

@Injectable({
  providedIn: 'root'
})
export class FbTeamService {
  private firestore = inject(Firestore);
  private teamsRef = collection(this.firestore, 'teams');

  list(): Observable<Team[]> {
    return collectionData(this.teamsRef, { idField: 'id' }) as Observable<Team[]>;
  }

  getById(id: string): Observable<Team> {
    const teamDoc = doc(this.firestore, `teams/${id}`);
    return docData(teamDoc, { idField: 'id' }) as Observable<Team>;
  }

  delete(id: string): Promise<void> {
    const teamDoc = doc(this.firestore, `teams/${id}`);
    return deleteDoc(teamDoc);
  }

  async create(team: Team): Promise<Team> {
    const docRef = await addDoc(this.teamsRef, team);
    return { ...team, id: docRef.id };
  }

  async update(id: string, team: Partial<Team>): Promise<void> {
    const teamDoc = doc(this.firestore, `teams/${id}`);
    return updateDoc(teamDoc, team);
  }

  getParticipantsByTeamId(id: string): Observable<string[]> {
    return this.getById(id).pipe(
      map((team) => team.participants)
    );
  }

  getAllTeams(): Observable<Team[]> {
    return collectionData(this.teamsRef, { idField: 'id' }) as Observable<Team[]>;
  }

  getTeamsByUser(userName: string): Observable<Team[]> {
    if (userName !== undefined && userName !== '') {
      return this.getAllTeams().pipe(
        map((teams: Team[]) => teams.filter(team => team.participants.includes(userName))),
      );
    } else {
      return this.getAllTeams();
    }
  }

  getTeamsByCreator(userId: string): Observable<Team[]> {
    const teamsRef = collection(this.firestore, 'teams');
    const q = query(teamsRef, where('creador', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<Team[]>;
  }



}
