import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Route, TimeType} from "../route";
import {ChartOptions} from "../chart-type";
import {formatDistance} from "date-fns";
import AutocompleteOptions = google.maps.places.AutocompleteOptions;


@Component({
  selector: 'app-route-planner',
  templateUrl: './route-planner.component.html',
  styleUrls: ['./route-planner.component.scss']
})
export class RoutePlannerComponent implements AfterViewInit {

  @ViewChild('fromInput', {static: false}) fromInputHtmlElement: ElementRef;
  @ViewChild('toInput', {static: false}) toInputHtmlElement: ElementRef;

  @Input() timeType: TimeType;
  @Input() time: string;
  @Input() results?: Route = undefined;
  @Input() sbbDeepLink: string;
  @Input() carDeepLink: string;
  @Input() historyGraph?: ChartOptions;

  @Output() fromChanged = new EventEmitter<string>();
  @Output() toChanged = new EventEmitter<string>();
  @Output() timeChanged = new EventEmitter<string>();
  @Output() timeTypeChanged = new EventEmitter<TimeType>();
  @Output() valueSwitchClicked = new EventEmitter<void>();

  @Output() analyzeClicked = new EventEmitter<void>();
  protected readonly undefined = undefined;
  protected readonly formatDistance = formatDistance;

  ngAfterViewInit(): void {
    const options: AutocompleteOptions = {
      componentRestrictions: {country: 'ch'},
      fields: ['address_components', 'geometry', 'name'],
      strictBounds: false
    };

    const autocompleteFrom = new google.maps.places.Autocomplete(this.fromInputHtmlElement.nativeElement, options);
    autocompleteFrom.addListener('place_changed', () => this.fromChanged.emit(this.fromInputHtmlElement.nativeElement.value));
    const autocompleteTo = new google.maps.places.Autocomplete(this.toInputHtmlElement.nativeElement, options);
    autocompleteTo.addListener('place_changed', () => this.toChanged.emit(this.toInputHtmlElement.nativeElement.value));
  }

  timeChangedEvent($event: Event) {
    // @ts-ignore
    this.timeChanged.emit($event.target['value']);
  }

  analyze() {
    document.getElementById('results')?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest"
    });

    this.analyzeClicked.emit();
  }

  valueSwitch() {
    const oldFrom = this.fromInputHtmlElement.nativeElement.value

    this.fromInputHtmlElement.nativeElement.value = this.toInputHtmlElement.nativeElement.value;
    this.toInputHtmlElement.nativeElement.value = oldFrom;

    this.valueSwitchClicked.emit();
  }

  calculateTrafficStatus() {
    if (!this.results) {
      return '';
    }

    const percentage = (this.results.car.offsetTraffic.value / this.results.car.durationInTraffic.value) * 100;
    if (percentage <= 5) {
      return 'Low traffic';
    } else if (percentage <= 25) {
      return 'Medium traffic';
    } else {
      return 'High traffic';
    }
  }

  calculateTrainRecomendation() {
    if (!this.results) {
      return '';
    }

    const trainTimeAgainstCar = this.getTrainAgainstCar();

    if (trainTimeAgainstCar <= 0) {
      return 'Recommended';
    } else if (trainTimeAgainstCar <= 15) {
      return 'Neutral'
    } else {
      return 'Not Recommended';
    }
  }

  calculatePPRecomendation() {
    if (!this.results) {
      return '';
    }

    const PPTimeAgainstCar = this.getPPAgainstCar();

    if (PPTimeAgainstCar <= 0) {
      return 'Recommended';
    } else if (PPTimeAgainstCar <= 15) {
      return 'Neutral'
    } else {
      return 'Not Recommended';
    }
  }

  getTrainAgainstCar() {
    if (!this.results) {
      return 0;
    }

    return this.results.publicTransport.duration.value - this.results.car.durationInTraffic.value;
  }

  getPPAgainstCar() {
    if (!this.results) {
      return 0;
    }

    return this.results.parkAndRide.value - this.results.car.durationInTraffic.value;
  }
}
