export interface Route {
  car: {
    durationInTraffic: Duration,
    duration: Duration,
    offsetTraffic: Duration,
  };
  publicTransport: {
    duration: Duration,
    offsetTraffic: Duration,
  };
}

interface Duration {
  text: string;
  value: number;
}

export enum TimeType {
  ARRIVAL,
  DEPARTURE
}
