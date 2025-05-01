import { inject, Injectable } from '@angular/core';
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

export interface Match {
  id?: string;
  date: string;
  description?: string;
  entry_tax?: string;
  hour: string;
  image?: string;
  name?: string;
  organizer: string;
  teams: string[];
  participants_num?: number;
  place: string;
  prize_pool?: string;
  tournament?: string;
  participants: string[]
}

@Injectable({
  providedIn: 'root'
})
export class FbMatchService {
  private firestore = inject(Firestore);
  private matchesRef = collection(this.firestore, 'matches');

  list(): Observable<Match[]> {
    return collectionData(this.matchesRef, { idField: 'id' }) as Observable<Match[]>;
  }

  getById(id: string): Observable<Match> {
    const matchDoc = doc(this.firestore, `matches/${id}`);
    return docData(matchDoc, { idField: 'id' }) as Observable<Match>;
  }

  delete(id: string): Promise<void> {
    const matchDoc = doc(this.firestore, `matches/${id}`);
    return deleteDoc(matchDoc);
  }

  async create(match: Match): Promise<Match> {
    const docRef = await addDoc(this.matchesRef, match);
    return { ...match, id: docRef.id };
  }
}
