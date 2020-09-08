import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { goals, Goal } from '../../services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  constructor(public auth: AuthService) {
    this.goals = goals;
  }

  goals: Goal[];

  goalSet: string;

  ngOnInit(): void {}

  register() {
    this.auth.setGoal(this.goalSet);
    this.auth.register();
  }
}
