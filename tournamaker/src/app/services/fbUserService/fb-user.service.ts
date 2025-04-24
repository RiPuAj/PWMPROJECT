import {inject, Injectable} from '@angular/core';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface User {
  id?: string;
  username: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class FbUserService {
  private firestore = inject(Firestore);
  private usersRef = collection(this.firestore, 'users');

  list(): Observable<User[]> {
    return collectionData(this.usersRef, { idField: 'id' }) as Observable<User[]>;
  }

}
