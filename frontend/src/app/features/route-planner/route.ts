export interface Route {
  car: {
    durationInTraffic: Duration,
    duration: Duration
  };
  publicTransport: {
    duration: Duration
  };
}

interface Duration {
  text: string;
  value: number;
}
