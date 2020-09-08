import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from './exercise.service';

export interface User {
  email: string;
  password: string;
  favoriteExercises?: string[];
  goal?: string;
}

export interface Goal {
  value: string;
  viewValue: string;
}

export const goals: Goal[] = [
  { value: 'lose', viewValue: 'Lose weight' },
  { value: 'gain', viewValue: 'Gain weight' },
  { value: 'maintain', viewValue: 'Maintain' },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersURL = '/api/users';
  TOKEN_KEY = 'jwt';
  password: string;
  goal: string;

  setPassword = (password: string) => {
    this.password = password;
  };

  setGoal = (goal: string) => {
    this.goal = goal;
  };

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(this.usersURL, {
      headers: { 'X-Auth-Token': localStorage.getItem(this.TOKEN_KEY) },
    });
  }

  updateUser(user: User) {
    this.http
      .put<User>(this.usersURL, user, {
        headers: { 'X-Auth-Token': localStorage.getItem(this.TOKEN_KEY) },
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
