import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../../services/exercise.service';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseDetailsComponent } from '../exercise-details/exercise-details.component';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-exercise-tile',
  templateUrl: './exercise-tile.component.html',
  styleUrls: ['./exercise-tile.component.css'],
})
export class ExerciseTileComponent implements OnInit {
  @Input() exercise: Exercise;
  @Input() user: User;

  constructor(public dialog: MatDialog, public userService: UserService) {}

  openDialog() {
    const dialogRef = this.dialog.open(ExerciseDetailsComponent, {
      data: {
        exercise: this.exercise,
        user: this.user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  addFavorite(exerciseId: string) {
    this.user.favoriteExercises.push(exerciseId);
    this.userService.updateUser(this.user);
  }

  removeFavorite(exerciseId: string) {
    const index = this.user.favoriteExercises.indexOf(exerciseId);
    if (index > -1) {
      this.user.favoriteExercises.splice(index, 1);
    }

    this.userService.updateUser(this.user);
  }

  ngOnInit(): void {}
}
