import {Component, Input} from '@angular/core';
import {ReadableService} from "../../../core/services/readable.service";

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent {
  @Input() readables: any;
  @Input() points: number;

  constructor(private readableService: ReadableService) {
  }

  isAlreadyRead(id: number): boolean {
    return this.readableService.isArticleRead(id);
  }
}
