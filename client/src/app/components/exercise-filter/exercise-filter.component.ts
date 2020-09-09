import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-exercise-filter',
  templateUrl: './exercise-filter.component.html',
  styleUrls: ['./exercise-filter.component.css'],
})
export class ExerciseFilterComponent implements OnInit {
  imageUrl: string = 'http://localhost:4200/assets/figure/blank.png';
  @Output() filtered = new EventEmitter<string>();
  @Input() filteredPart: string;

  constructor() {}

  ngOnInit(): void {}

  clear() {
    if (this.filteredPart) {
      this.imageUrl = `http://localhost:4200/assets/figure/${this.filteredPart}.png`;
    } else {
      this.imageUrl = 'http://localhost:4200/assets/figure/blank.png';
    }
  }

  mouseEnter(bodyPart: string) {
    this.imageUrl = `http://localhost:4200/assets/figure/${bodyPart}.png`;
  }

  filter(bodyPart: string) {
    this.imageUrl = `http://localhost:4200/assets/figure/${bodyPart}.png`;
    this.filtered.emit(bodyPart);
  }
}
