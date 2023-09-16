// noinspection ES6UnusedImports
import {} from 'googlemaps';
import {Injectable} from '@angular/core';
import DirectionsRequest = google.maps.DirectionsRequest;
import TrafficModel = google.maps.TrafficModel;

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private directionsService = new google.maps.DirectionsService();

  constructor() {
  }

  test() {
    let date = new Date("18 Sep 2023 05:00:10 GMT");
    var request: DirectionsRequest = {
      origin: 'Sarnen',
      destination: 'Zürich',
      // Note that JavaScript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: date,
        trafficModel: TrafficModel.BEST_GUESS
      }
    };
    this.directionsService.route(request, function (response, status) {
      console.log(response, status)
    });
  }
}
