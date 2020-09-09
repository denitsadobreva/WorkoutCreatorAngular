import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../../services/exercise.service';
import { User } from '../../services/user.service';


@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
})
export class ExerciseListComponent implements OnInit {
  @Input() exercises: Exercise[];
  @Input() user: User;
  
  constructor() {
  }

  ngOnInit(): void {
  }
}
