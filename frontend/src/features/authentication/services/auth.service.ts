import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: string;

  login(user: string): void {
    this.currentUser = user;
  }

  logout() {
    this.currentUser = null;
  }
}
