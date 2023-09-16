import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent {
  @Input() readables: any;
  @Input() points: number;
}
