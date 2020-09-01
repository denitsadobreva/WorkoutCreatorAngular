import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  TOKEN_KEY = 'jwt';

  login = (key: string) => {
    localStorage.setItem(this.TOKEN_KEY, key);
  };

  logout = () => {
    localStorage.removeItem(this.TOKEN_KEY);
    window.location.reload();
  };

  isLogin = () => {
    if (localStorage.getItem(this.TOKEN_KEY)) {
      return true;
    }

    return false;
  };

  constructor() {}
}
