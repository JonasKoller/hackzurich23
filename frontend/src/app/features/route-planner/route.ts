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
  history: {date: Date, durationInTraffic: Duration}[];
  startAddress: string;
  endAddress: string;
  parkAndRide: Duration
}

interface Duration {
  text: string;
  value: number;
}

export enum TimeType {
  ARRIVAL,
  DEPARTURE
}
