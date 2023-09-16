import {Component, OnInit} from '@angular/core';
import {ReadableService} from "../../../core/services/readable.service";
import {Observable} from "rxjs";
import {PointsService} from "../../../core/services/points.service";

@Component({
  selector: 'app-learning-container',
  templateUrl: './learning-container.component.html',
})
export class LearningContainerComponent implements OnInit {
  readables$: Observable<any> | null = null;
  points: number = 0;
  isLoading = true;

  constructor(private readableService: ReadableService, private pointsService: PointsService) {
  }

  ngOnInit(): void {
    this.readables$ = this.readableService.getAllReadables();
    this.points = this.pointsService.getPoints();
    this.isLoading = false;
  }
}
