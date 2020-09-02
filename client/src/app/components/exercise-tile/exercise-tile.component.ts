import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../../services/exercise.service';

@Component({
  selector: 'app-exercise-tile',
  templateUrl: './exercise-tile.component.html',
  styleUrls: ['./exercise-tile.component.css'],
})
export class ExerciseTileComponent implements OnInit {
  @Input() exercise: Exercise;

  constructor() {}

  ngOnInit(): void {}
}
