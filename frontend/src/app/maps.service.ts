// noinspection ES6UnusedImports
import {} from 'googlemaps';
import {Injectable} from '@angular/core';
import {Route} from "./features/route-planner/route";
import {add, formatDistance, sub} from 'date-fns'
import DirectionsRequest = google.maps.DirectionsRequest;
import TrafficModel = google.maps.TrafficModel;
import Duration = google.maps.Duration;
import RankBy = google.maps.places.RankBy;
import LatLng = google.maps.LatLng;

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private directionsService = new google.maps.DirectionsService();
  private placesService = new google.maps.places.PlacesService((document.getElementById('hidden') as HTMLDivElement));
  private geocodingService = new google.maps.Geocoder();

  constructor() {
  }

  async makeShitHappen(from: string, to: string): Promise<Route> {
    const [car, publicTransport, history, parkAndRide] = await Promise.all([
      this.getRoutesCar(from, to, new Date("18 Sep 2023 05:00:10 GMT")),
      this.getRoutesPublic(from, to, new Date("18 Sep 2023 05:00:10 GMT")),
      this.getCarHistory(from, to, new Date("18 Sep 2023 05:00:10 GMT")),
      this.getRoutesParkAndRide(from, to, new Date("18 Sep 2023 05:00:10 GMT")),
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
      parkAndRide
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

  async getRoutesParkAndRide(start: string, end: string, date: Date): Promise<Duration> {
    let startLocation: LatLng = await new Promise((resolve, reject) => {
      this.geocodingService.geocode({address: start, region: "ch"}, function (response, status) {
        if (status !== 'OK') {
          reject(status);
        }
        if (response.length <= 0 || response[0].geometry === undefined || response[0].geometry.location === undefined) {
          reject('No routes found');
        }
        console.log("get geocode: ", response);

        resolve(response[0].geometry.location);
      });
    });

    let nearestParkAndRailLatLng: LatLng = await new Promise((resolve, reject) => {
      this.placesService.nearbySearch({location: startLocation, rankBy: RankBy.DISTANCE, keyword: "SBB P+Rail", type: "parking"},function (response, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          reject(status);
        }
        if (response.length <= 0 || response[0].geometry === undefined ||response[0].geometry.location === undefined) {
          reject('No routes found');
          return;
        }
        console.log("get nearbySearch: ", response);

        resolve(response[0].geometry.location);
      });
    });


    let requestDistanceToParkAndRide: DirectionsRequest = {
      origin: start,
      destination: nearestParkAndRailLatLng,
      // Note that JavaScript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: date,
        trafficModel: TrafficModel.BEST_GUESS
      }
    };
    let distanceToParkAndRail: {durationInTraffic: Duration, duration: Duration} = await new Promise((resolve, reject) => {
      this.directionsService.route(requestDistanceToParkAndRide, function (response, status) {
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

    let departureDateTrain = add(date, {seconds: distanceToParkAndRail.durationInTraffic.value});

    let requestDistanceFromParkAndRideToDestination: DirectionsRequest = {
      origin: nearestParkAndRailLatLng,
      destination: end,
      // Note that JavaScript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode.TRANSIT,
      drivingOptions: {
        departureTime: departureDateTrain
      }
    };
    let distanceFromParkAndRideToDestination: {duration: Duration} = await new Promise((resolve, reject) => {
      this.directionsService.route(requestDistanceFromParkAndRideToDestination, function (response, status) {
        if (status !== 'OK') {
          reject(status);
        }
        if (response.routes.length <= 0 || response.routes[0].legs.length <= 0) {
          reject('No routes found');
        }
        console.log("get route: ", response);

        const aa = {
          duration: response.routes[0].legs[0].duration  // TODO Are we sure only one leg?
        };
        resolve(aa);
      });
    });

    let secondsTotal: number = distanceFromParkAndRideToDestination.duration.value + distanceToParkAndRail.durationInTraffic.value;
    return this.secondsToDuration(secondsTotal);
  }
}
