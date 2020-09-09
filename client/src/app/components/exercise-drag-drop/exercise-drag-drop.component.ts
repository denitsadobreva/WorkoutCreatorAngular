import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { ExerciseService, Exercise } from '../../services/exercise.service';
import { UserService, User } from '../../services/user.service';
import {
  WorkoutExercise,
  WorkoutService,
} from '../../services/workout.service';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseDetailsComponent } from '../exercise-details/exercise-details.component';

@Component({
  selector: 'app-exercise-drag-drop',
  templateUrl: './exercise-drag-drop.component.html',
  styleUrls: ['./exercise-drag-drop.component.css'],
})
export class ExerciseDragDropComponent implements OnInit {
  @Input() editMode: boolean = false;
  EXERCISES = 'EXERCISES';
  public exercisesUnfiltered: Exercise[];
  public exercisesLeft: Exercise[];
  public exercisesRight: Exercise[] = [];
  user: User;
  spinner: boolean = true;

  subs = new Subscription();

  public constructor(
    private dragulaService: DragulaService,
    public exerciseService: ExerciseService,
    public userService: UserService,
    public workoutService: WorkoutService,
    public dialog: MatDialog
  ) {
    this.subs.add(
      dragulaService
        .dropModel(this.EXERCISES)
        .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
          if (target.classList.contains('exercises-right')) {
            this.workoutService.addedExercises = targetModel;
            this.workoutService.addedExercisesMap.set(item._id, {
              exercise: item._id,
              reps: 10,
              sets: 3,
            });
          } else {
            this.workoutService.addedExercises = sourceModel;
          }
        })
    );
    this.subs.add(
      dragulaService
        .removeModel(this.EXERCISES)
        .subscribe(({ el, source, item, sourceModel }) => {})
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.getUser();
    this.getExercises();
  }

  getExercises(): void {
    this.spinner = true;
    this.exerciseService.getExercises().subscribe((exercises) => {
      this.exercisesUnfiltered = exercises;
      this.exercisesLeft = exercises;
      if (this.editMode) {
        this.workoutService.addedExercises = Array.from(
          this.workoutService.addedExercisesMap.keys()
        ).map((id) => exercises.find((el) => el._id === id));

        this.exercisesRight = this.workoutService.addedExercises;
      }

      this.spinner = false;
    });
  }

  getUser(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  toggleFilterFavorites() {
    if (this.exercisesLeft.length === this.exercisesUnfiltered.length) {
      this.exercisesLeft = this.user.favoriteExercises.map((id) =>
        this.exercisesUnfiltered.find((exercise) => exercise._id === id)
      );
    } else {
      this.exercisesLeft = this.exercisesUnfiltered;
    }
  }

  openDialog(exercise) {
    const dialogRef = this.dialog.open(ExerciseDetailsComponent, {
      data: {
        exercise: exercise,
        user: this.user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
