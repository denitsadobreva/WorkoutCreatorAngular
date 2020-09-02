import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface Goal {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  goals: Goal[] = [
    { value: 'lose', viewValue: 'Lose weight' },
    { value: 'gain', viewValue: 'Gain weight' },
    { value: 'maintain', viewValue: 'Maintain' },
  ];
}
