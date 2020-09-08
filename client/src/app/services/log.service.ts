import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Measurements {
  weight?: number;
  bicep?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  thigh?: number;
  calf?: number;
}

export interface Log {
  workout: string;
  notes: string;
  date: Date;
  measurements: Measurements;
}

@Injectable({
  providedIn: 'root',
})
export class LogService {
  logURL = '/api/logs';
  TOKEN_KEY = 'jwt';

  createLog(log: Log) {
    this.http
      .post(this.logURL, log, {
        headers: { 'X-Auth-Token': localStorage.getItem(this.TOKEN_KEY) },
        observe: 'response',
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  getLogs(): Observable<any> {
    return this.http.get(this.logURL, {
      headers: { 'X-Auth-Token': localStorage.getItem(this.TOKEN_KEY) },
    });
  }

  deleteLog(id: string): Observable<any> {
    return this.http.delete(`${this.logURL}/${id}`, {
      headers: { 'X-Auth-Token': localStorage.getItem(this.TOKEN_KEY) },
    });
  }

  updateLog(id: string, log: Log) {
    this.http
      .put(`${this.logURL}/${id}`, log, {
        headers: { 'X-Auth-Token': localStorage.getItem(this.TOKEN_KEY) },
        observe: 'response',
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  constructor(private http: HttpClient) {}
}
