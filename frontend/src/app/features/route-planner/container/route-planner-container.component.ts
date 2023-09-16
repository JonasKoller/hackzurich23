import {Component} from '@angular/core';
import {MapsService} from "../../../maps.service";
import {Route, TimeType} from "../route";
import {format} from "date-fns";

@Component({
  selector: 'app-route-planner-container',
  templateUrl: './route-planner-container.component.html',
})
export class RoutePlannerContainerComponent {
  results?: Route = undefined;
  from: string = '';
  to: string = '';
  time: string = format(Date.now(), 'HH:mm');
  timeType: TimeType = TimeType.DEPARTURE;

  constructor(readonly mapsService: MapsService) {
  }

  async analyze() {
    this.results = await this.mapsService.makeShitHappen(this.from, this.to);
  }

  fromChanged($event: string) {
    this.from = $event;
  }

  toChanged($event: string) {
    this.to = $event;
  }

  switchValues() {
    const oldFrom = this.from;

    this.from = this.to;
    this.to = oldFrom;
  }


  createSbbDeepLink(): string {
    return `https://www.sbb.ch/de/kaufen/pages/fahrplan/fahrplan.xhtml?von=${encodeURIComponent(this.from)}&nach=${encodeURIComponent(this.to)}&zeit=${this.time}&an=${this.timeType === TimeType.ARRIVAL}&suche=true`;
  }

  timeTypeChanged($event: TimeType) {
    this.timeType = $event;
  }

  timeChanged($event: string) {
    this.time = $event;
  }
}
