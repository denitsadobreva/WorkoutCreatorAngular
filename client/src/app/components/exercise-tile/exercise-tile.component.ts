import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../../services/exercise.service';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseDetailsComponent } from '../exercise-details/exercise-details.component';

@Component({
  selector: 'app-exercise-tile',
  templateUrl: './exercise-tile.component.html',
  styleUrls: ['./exercise-tile.component.css'],
})
export class ExerciseTileComponent implements OnInit {
  @Input() exercise: Exercise;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ExerciseDetailsComponent, {
      data: {
        exercise: this.exercise
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {}
}
