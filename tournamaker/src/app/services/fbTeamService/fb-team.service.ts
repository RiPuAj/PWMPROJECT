import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Team {
  id?: string;
  name: string;
  image: string;
  participants: string[];
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

  getParticipantsByTeamId(id: string): Observable<string[]> {
    return this.getById(id).pipe(
      map((team) => team.participants)
    );
  }

}
