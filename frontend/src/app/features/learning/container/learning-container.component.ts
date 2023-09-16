import {Component, OnInit} from '@angular/core';
import {ReadableService} from "../../../core/services/readable.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-learning-container',
  templateUrl: './learning-container.component.html',
})
export class LearningContainerComponent implements OnInit {
  readables$: Observable<any> | null = null;

  constructor(private readableService: ReadableService) {
  }

  ngOnInit(): void {
    this.readables$ = this.readableService.getAllReadables();
  }
}
