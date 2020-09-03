import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { ExerciseService, Exercise } from '../../services/exercise.service';
import { UserService, User } from '../../services/user.service';
import { WorkoutExercise } from '../../services/workout.service';

@Component({
  selector: 'app-exercise-drag-drop',
  templateUrl: './exercise-drag-drop.component.html',
  styleUrls: ['./exercise-drag-drop.component.css'],
})
export class ExerciseDragDropComponent implements OnInit {
  EXERCISES = 'EXERCISES';
  /* public many = ['The', 'possibilities', 'are', 'endless!'];
  public many2 = ['Explore', 'them']; */
  public exercises: Exercise[];
  public workoutExercises: Exercise[] = [];
  user: User;
  spinner: boolean = true;

  subs = new Subscription();

  public constructor(
    private dragulaService: DragulaService,
    public exerciseService: ExerciseService,
    public userService: UserService
  ) {
    this.subs.add(
      dragulaService
        .dropModel(this.EXERCISES)
        .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
          console.log('dropModel:');
          console.log(el);
          console.log(source);
          console.log(target);
          console.log(sourceModel);
          console.log(targetModel);
          console.log(item);
        })
    );
    this.subs.add(
      dragulaService
        .removeModel(this.EXERCISES)
        .subscribe(({ el, source, item, sourceModel }) => {
          console.log('removeModel:');
          console.log(el);
          console.log(source);
          console.log(sourceModel);
          console.log(item);
        })
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
      this.exercises = exercises;
      this.spinner = false;
    });
  }

  getUser(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }

}
