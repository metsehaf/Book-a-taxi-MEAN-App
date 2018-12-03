import { Directive, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
// const google = require('@types/googlemaps');
declare var google: any;
import {} from 'googlemaps';

@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(private elRef: ElementRef) {

    // elRef will get a reference to the element where
    // the directive is placed

    this.element = elRef.nativeElement;
  }

  getFormattedAddress(place) {
    // @params: place - Google Autocomplete place object
    // @returns: location_obj - An address object in human readable format

    let location_obj = {};

    for (let i in place.address_components) {
      let item = place.address_components[i];
      location_obj['formatted_address'] = place.formatted_address;
    }
    return location_obj;
  }

  ngOnInit() {
    const options = {
      // types: ['(cities)'],
      componentRestrictions: {country: 'ca'}
     };

    const autocomplete = new google.maps.places.Autocomplete(this.element, options);

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      // Emit the new address object for the updated place
      this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
    });
  }
}
