import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { ExerciseService, Exercise } from '../../services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  filter: string;
  exercises: Exercise[];
  exercisesFiltered: Exercise[];
  user: User;
  spinner: boolean = true;

  constructor(
    public exerciseService: ExerciseService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.getUser();
    this.getExercises();
  }

  getUser(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  getExercises(): void {
    this.spinner = true;
    this.exerciseService.getExercises().subscribe((exercises) => {
      this.exercises = exercises;
      this.exercisesFiltered = exercises;
      this.spinner = false;
    });
  }

  onChangeFilter(filter: string) {
    if (filter === this.filter) {
      this.exercisesFiltered = this.exercises;
      this.filter = undefined;
    } else {
      this.filter = filter;
      this.exercisesFiltered = this.exercises.filter((exercise) =>
        exercise.muscleGroups.includes(filter)
      );
    }
  }
}
