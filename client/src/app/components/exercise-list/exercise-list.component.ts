import { Component, OnInit } from '@angular/core';
import { ExerciseService, Exercise } from '../../services/exercise.service';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
})
export class ExerciseListComponent implements OnInit {
  exercises: Exercise[];
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
    });
  }
}
