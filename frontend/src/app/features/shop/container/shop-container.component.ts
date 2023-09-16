import {Component} from '@angular/core';
import {PointsService} from "../../../core/services/points.service";

@Component({
  selector: 'app-shop-container',
  templateUrl: './shop-container.component.html',
})
export class ShopContainerComponent {
  points: number = 0;

  constructor(private pointsService: PointsService) {
  }

  ngOnInit(): void {
    this.points = this.pointsService.getPoints();
  }
}
