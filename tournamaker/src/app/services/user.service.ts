import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers() {
    this.http.get<User[]>('/assets/mocks/MOCK_USERS.json').subscribe((data) => {
      this.usersSubject.next(data);
    });
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  updateUsers(users: User[]) {
    this.usersSubject.next(users);
  }
}
