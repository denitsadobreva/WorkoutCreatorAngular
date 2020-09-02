import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  TOKEN_KEY = 'jwt';
  private email: string;
  private password: string;
  private goal: string;
  private isAuthenticated: boolean;
  private authURL = '/api/auth';
  private registerURL = '/api/users';
  public redirectUrl;

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

  constructor(private http: HttpClient, private router: Router) {}

  get authenticated() {
    return this.isAuthenticated || this.isLogin();
  }

  setEmail = (email: string) => {
    this.email = email;
  };

  setPassword = (password: string) => {
    this.password = password;
  };

  setGoal = (goal: string) => {
    this.goal = goal;
  };

  register() {
    this.http
      .post(
        this.registerURL,
        {
          email: this.email,
          password: this.password,
          goal: this.goal,
        },
        { observe: 'response' }
      )
      .subscribe((response) => {
        if (response.status === 200) {
          this.login((response.body as any).token);
          this.isAuthenticated = this.isLogin();
          this.router.navigate(['/']);
        }
      });
  }

  loginApi = async () => {
    this.http
      .post(
        this.authURL,
        {
          email: this.email,
          password: this.password,
        },
        { observe: 'response' }
      )
      .subscribe((response) => {
        if (response.status === 200) {
          this.login((response.body as any).token);
          this.isAuthenticated = this.isLogin();

          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
          } else {
            this.router.navigate(['/']);
          }
        }
      });
  };
}
