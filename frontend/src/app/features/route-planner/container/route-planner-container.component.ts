import {Component} from '@angular/core';
import {MapsService} from "../../../core/services/maps.service";
import {Route, TimeType} from "../../../core/types/route";
import {format, formatDistance} from "date-fns";
import {ChartOptions} from "../../../core/types/chart-type";

@Component({
  selector: 'app-route-planner-container',
  templateUrl: './route-planner-container.component.html',
})
export class RoutePlannerContainerComponent {
  results?: Route = undefined;
  historyChart?: ChartOptions = undefined;
  from: string = '';
  to: string = '';
  time: string = format(Date.now(), 'HH:mm');
  timeType: TimeType = TimeType.DEPARTURE;

  constructor(readonly mapsService: MapsService) {

  }

  async analyze() {
    this.results = await this.mapsService.makeShitHappen(this.from, this.to, this.time, this.timeType);
    this.historyChart = {
      series: [
        {
          name: "Times",
          data: this.results.history.map(h => Math.floor(h.durationInTraffic.value / 60))
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      legend: {},
      xaxis: {
        categories: [
          "Departure Time",
          "+10min",
          "+20min",
          "+30min",
          "+40min",
          "+50min",
          "+1h",
          "+1h 10min",
          "+1h 20min",
          "+1h 30min",
          "+1h 40min",
          "+1h 50min",
          "+2h"
        ]
      },
      yaxis: {
        title: {
          text: "time (minutes)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return formatDistance(0, val * 60 * 1000, {includeSeconds: true});
          }
        }
      }
    };
  }

  fromChanged($event: string) {
    this.from = $event;
    this.removeSwitzerlandSuffix();
  }

  toChanged($event: string) {
    this.to = $event;
    this.removeSwitzerlandSuffix();
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
    console.log('ALARM! ' + this.time);
  }

  createCarDeepLink(): string {
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(this.from)}&destination=${encodeURIComponent(this.to)}&travelmode=driving&dir_action=navigate`;
  }

  removeSwitzerlandSuffix() {
    this.to = this.to.replace(', Switzerland', '');
    this.to = this.to.replace(', Schweiz', '');
    this.from = this.from.replace(', Switzerland', '');
    this.from = this.from.replace(', Schweiz', '');
  }
}
