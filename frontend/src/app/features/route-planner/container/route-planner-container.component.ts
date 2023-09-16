import {Component} from '@angular/core';
import {MapsService} from "../../../maps.service";

@Component({
  selector: 'app-route-planner-container',
  templateUrl: './route-planner-container.component.html',
})
export class RoutePlannerContainerComponent {
  results: any = undefined;
  from: string = '';
  to: string = '';

  constructor(readonly mapsService: MapsService) {
  }

  async analyze() {
    this.results = await this.mapsService.makeShitHappen();
  }

  fromChanged($event: string) {
    this.from = $event;
  }

  toChanged($event: string) {
    this.to = $event;
  }
}
