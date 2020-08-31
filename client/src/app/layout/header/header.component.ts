import { Component, OnInit } from '@angular/core';
import { isLogin } from '../../utils/isAuth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showAuthorizedLinks() {
    return isLogin();
  }

}
