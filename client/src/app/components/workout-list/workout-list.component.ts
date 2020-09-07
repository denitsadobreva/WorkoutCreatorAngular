import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { ExerciseService } from '../../services/exercise.service';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseDetailsComponent } from '../exercise-details/exercise-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit {
  spinner: boolean = true;
  public workouts: any;
  public exercises: any;

  constructor(
    public workoutService: WorkoutService,
    public exerciseService: ExerciseService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getWorkouts();
    this.getExercises();
  }

  getWorkouts(): void {
    this.spinner = true;
    this.workoutService.getWorkouts().subscribe((workouts) => {
      this.workouts = new Map(
        workouts.map((workout) => [workout._id, workout])
      );
    });
  }

  getExercises(): void {
    this.spinner = true;
    this.exerciseService.getExercises().subscribe((exercises) => {
      this.exercises = new Map(
        exercises.map((exercise) => [exercise._id, exercise])
      );
      this.spinner = false;
    });
  }

  deleteWorkout(id) {
    this.workoutService.deleteWorkout(id).subscribe(() => {
      this.workouts.delete(id);
    });
  }

  openDialog(exercise) {
    const dialogRef = this.dialog.open(ExerciseDetailsComponent, {
      data: {
        exercise: exercise,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  goToEditWorkout(id) {
    this.router.navigate(['/workouts', id]);
  }
}
