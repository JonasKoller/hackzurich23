import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import AutocompleteOptions = google.maps.places.AutocompleteOptions;
import {MapsService} from "../../../maps.service";

@Component({
  selector: 'app-route-planner',
  templateUrl: './route-planner.component.html',
  styleUrls: ['./route-planner.component.scss']
})
export class RoutePlannerComponent implements AfterViewInit {

  @ViewChild('fromInput', { static: false }) fromInputHtmlElement: ElementRef;
  @ViewChild('toInput', { static: false }) toInputHtmlElement: ElementRef;

  @Output() fromChanged = new EventEmitter<string>();
  @Output() toChanged = new EventEmitter<string>();

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


}
