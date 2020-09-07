import { Component, OnInit, Input } from '@angular/core';
import { WorkoutService, Workout } from '../../services/workout.service';
import { Exercise } from '../../services/exercise.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent implements OnInit {
  @Input() workout?: Workout;
  @Input() editMode?: boolean = false;

  constructor(public workoutService: WorkoutService) {}

  public isButtonDisabled() {
    return (
      !this.workoutService.name || !this.workoutService.addedExercises.length
    );
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.workoutService.setName(this.workout.name);
      this.workoutService.setDescription(this.workout.description);
      this.workoutService.addedExercisesMap = new Map(
        this.workout.exercises.map((exercise) => [exercise.exercise, exercise])
      );
    }
  }

  ngOnDestroy() {
    this.workoutService.setName('');
    this.workoutService.setDescription('');
    this.workoutService.addedExercisesMap = new Map();
  }
}
