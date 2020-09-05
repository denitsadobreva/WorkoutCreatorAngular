import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css'],
})
export class ExerciseDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    public authService: AuthService
  ) {}

  addFavorite(exerciseId: string) {
    this.data.user.favoriteExercises.push(exerciseId);
    this.userService.updateUser(this.data.user);
  }

  removeFavorite(exerciseId: string) {
    const index = this.data.user.favoriteExercises.indexOf(exerciseId);
    if (index > -1) {
      this.data.user.favoriteExercises.splice(index, 1);
    }

    this.userService.updateUser(this.data.user);
  }

  ngOnInit(): void {}
}
