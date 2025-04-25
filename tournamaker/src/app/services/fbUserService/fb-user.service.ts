import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  query,
  where
} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';


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

  getById(id: string): Observable<User> {
    const userDoc = doc(this.firestore, `users/${id}`);
    return docData(userDoc, { idField: 'id' }) as Observable<User>;
  }

  getByEmail(email: string): Observable<User | undefined> {
    const q = query(this.usersRef, where('email', '==', email));
    return collectionData(q, { idField: 'id' }).pipe(
      map(users => users[0] as User | undefined)
    );
  }

  delete(id: string): Promise<void> {
    const userDoc = doc(this.firestore, `users/${id}`);
    return deleteDoc(userDoc);
  }

  async create(user: User): Promise<void> {
    await addDoc(this.usersRef, user);
  }

}
