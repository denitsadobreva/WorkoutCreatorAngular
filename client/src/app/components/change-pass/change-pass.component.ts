import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css'],
})
export class ChangePassComponent implements OnInit {
  constructor(public userService: UserService) {}
  user: User;

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  updateUser() {
    this.userService.updateUser(this.user);
  }

  setPassword(pass) {
    this.user.password = pass;
  }
}
