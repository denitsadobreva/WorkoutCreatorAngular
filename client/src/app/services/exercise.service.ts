import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Exercise {
  name: string;
  description?: string;
  level: string;
  type: string;
  muscleGroups?: string[];
  equipment?: string[];
  photoUrl?: string;
  videoUrl?: string;
  user?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exercisesURL = '/api/exercises';

  constructor(private http: HttpClient) {}

  getExercises(): Observable<any> {
    return this.http.get(this.exercisesURL);
  }
}
