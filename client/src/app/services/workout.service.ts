import { Injectable } from '@angular/core';

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
  constructor() {}
}
