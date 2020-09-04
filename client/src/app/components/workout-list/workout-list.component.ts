import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit {
  spinner: boolean = true;
  public workouts: any[];

  constructor(public workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts(): void {
    this.spinner = true;
    this.workoutService.getWorkouts().subscribe((workouts) => {
      this.workouts = workouts;
      this.spinner = false;
    });
  }
}
