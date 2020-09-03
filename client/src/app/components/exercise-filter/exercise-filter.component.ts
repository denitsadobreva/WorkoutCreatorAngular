import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-filter',
  templateUrl: './exercise-filter.component.html',
  styleUrls: ['./exercise-filter.component.css'],
})
export class ExerciseFilterComponent implements OnInit {
  imageUrl: string = 'http://localhost:4200/assets/figure/blank.png';

  constructor() {}

  ngOnInit(): void {}

  mouseEnter(bodyPart: string) {
    this.imageUrl = `http://localhost:4200/assets/figure/${bodyPart}.png`;
  }

  filter(bodyPart: string) {
    console.log(bodyPart);
  }
}
