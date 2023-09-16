// noinspection ES6UnusedImports
import {} from 'googlemaps';
import {Injectable} from '@angular/core';
import {Route} from "./features/route-planner/route";
import {add, formatDistance, sub} from 'date-fns'
import DirectionsRequest = google.maps.DirectionsRequest;
import TrafficModel = google.maps.TrafficModel;
import Duration = google.maps.Duration;
import {hi} from "date-fns/locale";

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private directionsService = new google.maps.DirectionsService();

  constructor() {
  }

  async makeShitHappen(from: string, to: string): Promise<Route> {
    const [car, publicTransport, history] = await Promise.all([
      this.getRoutesCar(from, to, new Date("18 Sep 2023 05:00:10 GMT")),
      this.getRoutesPublic(from, to, new Date("18 Sep 2023 05:00:10 GMT")),
      this.getCarHistory(from, to, new Date("18 Sep 2023 05:00:10 GMT")),
      // this.getRoutesParkAndRide(from, to, new Date("18 Sep 2023 05:00:10 GMT")),
    ]);

    console.log(history)

    return {
      car: {
        ...car,
        offsetTraffic: this.secondsToDuration(car.durationInTraffic.value - car.duration.value)
      },
      publicTransport: {
        ...publicTransport,
        offsetTraffic: this.secondsToDuration(car.durationInTraffic.value - publicTransport.duration.value)
      },
      history,
      startAddress: from,
      endAddress: to,
    }
  }

  async getCarHistory(from: string, to: string, startDate: Date) {
    const first = sub(startDate, {hours: 1});
    const promises = Array
      .from({length: 13}, (_, i) => add(first, {minutes: i * 10}))
      .map(async date => ({drive: await this.getRoutesCar(from, to, date), date}));
    const drives = await Promise.all(promises);
    return drives.map(({drive, date}) => {
      return {
        date: date,
        durationInTraffic: drive.durationInTraffic,
      }
    })
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

  getRoutesParkAndRide(start: string, end: string, date: Date) {
    var request: DirectionsRequest = {
      origin: start,
      destination: "SBB P+Rail",
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
