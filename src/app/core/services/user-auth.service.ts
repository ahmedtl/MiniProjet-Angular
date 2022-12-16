// user-auth to stage data in local storage
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  
  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles') as any);
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string|null {
    return localStorage.getItem('jwtToken');
  }
  
  public setuser(user: []) {
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getuser(): [] {
    return  JSON.parse(localStorage.getItem('user')as any);
  }

  public clear() {
    window.localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
