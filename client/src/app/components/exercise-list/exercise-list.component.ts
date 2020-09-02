import { Component, OnInit } from '@angular/core';
import { ExerciseService, Exercise } from '../../services/exercise.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
})
export class ExerciseListComponent implements OnInit {
  exercises: Exercise[];

  constructor(public exerciseService: ExerciseService) {}

  ngOnInit() {
    this.getExercises();
  }

  getExercises(): void {
    this.exerciseService
      .getExercises()
      .subscribe((exercises) => (this.exercises = exercises));
  }
}
