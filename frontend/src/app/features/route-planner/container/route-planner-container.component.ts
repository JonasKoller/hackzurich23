import {Component} from '@angular/core';
import {MapsService} from "../../../maps.service";
import {Route, TimeType} from "../route";
import {format} from "date-fns";
import {ChartOptions} from "../chart-type";
import {formatDistance} from "date-fns";

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
    this.results = await this.mapsService.makeShitHappen(this.from, this.to);
    this.historyChart  = {
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
          "-60min",
          "-50min",
          "-40min",
          "-30min",
          "-20min",
          "-10min",
          "desired",
          "+10min",
          "+20min",
          "+30min",
          "+40min",
          "+50min",
          "+60min"
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
