import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Exercise } from '../../services/exercise.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent implements OnInit {

  constructor(public workoutService: WorkoutService) { }

  ngOnInit(): void {
  }

}
