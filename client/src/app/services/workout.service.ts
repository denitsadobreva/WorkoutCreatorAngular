import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exercise } from './exercise.service';

export interface WorkoutExercise {
  exercise: string;
  sets: number;
  reps: number;
}

export interface Workout {
  name: string;
  description: string;
  exercises: WorkoutExercise[];
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  public workoutURL = '/api/workouts';
  TOKEN_KEY = 'jwt';
  public addedExercises: Exercise[] = [];
  public addedExercisesMap = new Map<string, WorkoutExercise>();
  public name: string;
  public description: string;

  constructor(private http: HttpClient, private router: Router) {}

  setName(name: string) {
    this.name = name;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setReps(id: string, newReps: string): void {
    const { reps, ...rest } = this.addedExercisesMap.get(id);
    this.addedExercisesMap.set(id, { reps: parseInt(newReps), ...rest });
  }

  setSets(id: string, newSets: string): void {
    const { sets, ...rest } = this.addedExercisesMap.get(id);
    this.addedExercisesMap.set(id, { sets: parseInt(newSets), ...rest });
  }

  getExercises() {
    return this.addedExercises.map(({ _id }) => this.addedExercisesMap.get(_id));
  }

  createWorkout() {
    this.http
      .post(
        this.workoutURL,
        {
          name: this.name,
          description: this.description,
          exercises: this.getExercises(),
        },
        {
          headers: { 'X-Auth-Token': localStorage.getItem(this.TOKEN_KEY) },
          observe: 'response',
        }
      )
      .subscribe((response) => {
        console.log(response);
        if (response.status === 200) {
          this.router.navigate(['/workouts']);
        }
      });
  }

  getWorkouts(): Observable<any> {
    return this.http.get(this.workoutURL, {
      headers: { 'X-Auth-Token': localStorage.getItem(this.TOKEN_KEY) },
    });
  }
}
