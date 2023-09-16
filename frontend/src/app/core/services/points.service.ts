import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor() { }

  private readonly LOCALSTORAGE_POINTS = 'user.points';

  getPoints(): number {
    let points = localStorage.getItem(this.LOCALSTORAGE_POINTS);
    if (points == undefined) {
      localStorage.setItem(this.LOCALSTORAGE_POINTS, String(0));
      points = "0";
    }
    return +points;
  }

  addPoints(points: number): void {
    localStorage.setItem(this.LOCALSTORAGE_POINTS, String(this.getPoints() + points));
  }
}
