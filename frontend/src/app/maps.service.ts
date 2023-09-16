// noinspection ES6UnusedImports
import {} from 'googlemaps';
import {Injectable} from '@angular/core';
import DirectionsRequest = google.maps.DirectionsRequest;
import TrafficModel = google.maps.TrafficModel;
import TravelMode = google.maps.TravelMode;

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private directionsService = new google.maps.DirectionsService();

  constructor() {
  }

  async makeShitHappen(from: string, to: string) {
    const [car, publicTransport] = await Promise.all([
      this.getRoutes(from, to, new Date("18 Sep 2023 05:00:10 GMT"), google.maps.TravelMode.DRIVING),
      this.getRoutes(from, to, new Date("18 Sep 2023 05:00:10 GMT"), google.maps.TravelMode.TRANSIT),
    ])

    return
  }

  getRoutes(start: string, end: string, date: Date, method: TravelMode) {
    var request: DirectionsRequest = {
      origin: start,
      destination: end,
      // Note that JavaScript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: method,
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
          response
        };
        resolve(aa);
      });
    });
  }
}
