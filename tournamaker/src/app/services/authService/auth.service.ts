import { Injectable } from '@angular/core';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserKey = 'currentUser';

  constructor() {}

  setUser(user: User): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  getUser(): User | null {
    if (typeof window === 'undefined') return null;

    const userJson = localStorage.getItem(this.currentUserKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }
}
