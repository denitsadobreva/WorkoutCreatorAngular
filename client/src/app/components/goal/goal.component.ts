import { Component, OnInit } from '@angular/core';
import { UserService, User, goals, Goal } from '../../services/user.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
})
export class GoalComponent implements OnInit {
  user: User;
  goals: Goal[];
  goalsMap: Map<string, string>;
  goalSet: string;
  editMode: boolean = false;

  constructor(public userService: UserService) {
    this.goals = goals;
    this.goalsMap = new Map(goals.map((goal) => [goal.value, goal.viewValue]));
  }

  ngOnInit(): void {
    this.getUser();
  }

  enableEdit() {
    this.editMode = true;
  }

  getUser() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.goalSet = user.goal;
    });
  }

  setGoal() {
    this.user.goal = this.goalSet;
    this.userService.updateUser(this.user);
    this.editMode = false;
  }
}
