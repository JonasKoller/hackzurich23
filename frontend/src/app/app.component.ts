import {Component, OnInit} from '@angular/core';
import {MapsService} from "./maps.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(private readonly mapsService: MapsService) {
  }

  ngOnInit() {
    this.mapsService.test();
  }

}
