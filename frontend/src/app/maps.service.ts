// noinspection ES6UnusedImports
import {} from 'googlemaps';
import {Injectable} from '@angular/core';
import {Route} from "./features/route-planner/route";
import {formatDistance} from 'date-fns'
import DirectionsRequest = google.maps.DirectionsRequest;
import TrafficModel = google.maps.TrafficModel;
import Duration = google.maps.Duration;

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private directionsService = new google.maps.DirectionsService();

  constructor() {
  }

  async makeShitHappen(from: string, to: string): Promise<Route> {
    const [car, publicTransport] = await Promise.all([
      this.getRoutesCar(from, to, new Date("18 Sep 2023 05:00:10 GMT")),
      this.getRoutesPublic(from, to, new Date("18 Sep 2023 05:00:10 GMT")),
    ])

    return {
      car: {
        ...car,
        offsetTraffic: this.secondsToDuration(car.durationInTraffic.value - car.duration.value)
      },
      publicTransport: {
        ...publicTransport,
        offsetTraffic: this.secondsToDuration(car.durationInTraffic.value - publicTransport.duration.value)
      }
    }
  }

  secondsToDuration(seconds: number): Duration {
    return {
      text: formatDistance(0, seconds * 1000, {includeSeconds: true}),
      value: seconds
    }
  }

  getRoutesCar(start: string, end: string, date: Date): Promise<{
    durationInTraffic: Duration,
    duration: Duration
  }> {
    var request: DirectionsRequest = {
      origin: start,
      destination: end,
      // Note that JavaScript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: date,
        trafficModel: TrafficModel.BEST_GUESS
      }
    };
    return new Promise((resolve, reject) => {
      this.directionsService.route(request, function (response, status) {
        if (status !== 'OK') {
          reject(status);
        }
        if (response.routes.length <= 0 || response.routes[0].legs.length <= 0) {
          reject('No routes found');
        }
        console.log("get route: ", response);

        const aa = {
          durationInTraffic: response.routes[0].legs[0].duration_in_traffic,
          duration: response.routes[0].legs[0].duration,
        };
        resolve(aa);
      });
    });
  }

  getRoutesPublic(start: string, end: string, date: Date): Promise<{
    duration: Duration
  }> {
    var request: DirectionsRequest = {
      origin: start,
      destination: end,
      // Note that JavaScript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode.TRANSIT,
      drivingOptions: {
        departureTime: date,
        trafficModel: TrafficModel.BEST_GUESS
      }
    };
    return new Promise((resolve, reject) => {
      this.directionsService.route(request, function (response, status) {
        if (status !== 'OK') {
          reject(status);
        }
        if (response.routes.length <= 0 || response.routes[0].legs.length <= 0) {
          reject('No routes found');
        }
        console.log("get route: ", response);

        const aa = {
          duration: response.routes[0].legs[0].duration,
        };
        resolve(aa);
      });
    });
  }
}
