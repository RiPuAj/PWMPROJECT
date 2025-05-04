import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore, updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Tournament {
  id?: string;
  name: string;
  date?: string;
  place?: string;
  organizer?: string;
  image?: string;
  description?: string;
  entry_tax?: string;
  teams?: string[];
  prize_pool?: string;
  teams_num?: number;
}


@Injectable({
  providedIn: 'root'
})
export class FbTournamentService {
  private firestore = inject(Firestore);
  private tournamentsRef = collection(this.firestore, 'tournaments');

  list(): Observable<Tournament[]> {
    return collectionData(this.tournamentsRef, { idField: 'id' }) as Observable<Tournament[]>;
  }

  getById(id: string): Observable<Tournament> {
    const tournamentDoc = doc(this.firestore, `tournaments/${id}`);
    return docData(tournamentDoc, { idField: 'id' }) as Observable<Tournament>;
  }

  delete(id: string): Promise<void> {
    const tournamentDoc = doc(this.firestore, `tournaments/${id}`);
    return deleteDoc(tournamentDoc);
  }

  async create(tournament: Tournament): Promise<Tournament> {
    const docRef = await addDoc(this.tournamentsRef, tournament);
    return { ...tournament, id: docRef.id };
  }

  async update(id: string, changes: Partial<Tournament>): Promise<void> {
    const tournamentDoc = doc(this.firestore, `tournaments/${id}`);
    return updateDoc(tournamentDoc, changes);
  }

}
