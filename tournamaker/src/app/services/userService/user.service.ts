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

  loginUser(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:5000/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  }

  updateUser(userId: number, updatedUser: User): Observable<User> {
    return this.http.patch<User>(`http://localhost:5000/users/${userId}`, updatedUser);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`http://localhost:5000/users/${userId}`);
  }


  createUser(newUser: User): Observable<User> {
    return this.http.post<User>('http://localhost:5000/users', newUser);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:5000/users/${userId}`);
  }

}
