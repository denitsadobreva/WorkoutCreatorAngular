import { Component, OnInit, Input } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  workout: any;
  id: string;
  private sub: any;
  spinner: boolean = true;

  constructor(
    public workoutService: WorkoutService,
    private route: ActivatedRoute
  ) {}

  getWorkout(id): void {
    this.workoutService.getWorkout(id).subscribe((workout) => {
      this.workout = workout;
      this.spinner = false;
    });
  }

  ngOnInit() {
    this.spinner = true;
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.getWorkout(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
