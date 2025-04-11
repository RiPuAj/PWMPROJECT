import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../models/user.model';
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

  loginUser(username: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:5000/users?username=${username}&password=${password}`);
  }

  updateUser(users: User[]) {
    this.usersSubject.next(users);
  }

  createUser(){

  }

  deleteUser(){

  }
}
