import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import AutocompleteOptions = google.maps.places.AutocompleteOptions;
import {MapsService} from "../../../maps.service";
import {TimeType} from "../route";

@Component({
  selector: 'app-route-planner',
  templateUrl: './route-planner.component.html',
  styleUrls: ['./route-planner.component.scss']
})
export class RoutePlannerComponent implements AfterViewInit {

  @ViewChild('fromInput', { static: false }) fromInputHtmlElement: ElementRef;
  @ViewChild('toInput', { static: false }) toInputHtmlElement: ElementRef;

  @Input() timeType: TimeType;

  @Output() fromChanged = new EventEmitter<string>();
  @Output() toChanged = new EventEmitter<string>();
  @Output() timeChanged = new EventEmitter<string>();
  @Output() timeTypeChanged = new EventEmitter<TimeType>();

  ngAfterViewInit(): void {
    const options: AutocompleteOptions = {
      componentRestrictions: { country: 'ch' },
      fields: ['address_components', 'geometry', 'name'],
      strictBounds: false
    };

    const autocompleteFrom = new google.maps.places.Autocomplete(this.fromInputHtmlElement.nativeElement, options);
    autocompleteFrom.addListener('place_changed', () => this.fromChanged.emit(this.fromInputHtmlElement.nativeElement.value));
    const autocompleteTo = new google.maps.places.Autocomplete(this.toInputHtmlElement.nativeElement, options);
    autocompleteTo.addListener('place_changed', () => this.toChanged.emit(this.toInputHtmlElement.nativeElement.value));
  }


  timeChangedEvent($event: Event) {
    this.timeChanged.emit($event.value);
  }
}
