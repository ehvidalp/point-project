import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild("placesRef") placesRef!: GooglePlaceDirective;
  @Output() marker = new EventEmitter<Address>();
  @ViewChild("inputSearch") inputSearch!: ElementRef;

  markerAddress: Address | undefined;


  constructor() { }

  ngOnInit(): void {
  }

  getAddress(address: Address) {
    this.markerAddress = address
    //send marker to core component
    this.marker.emit(address)
  }

  newSearch(){
    this.inputSearch.nativeElement.focus()
    this.inputSearch.nativeElement.value = ''
  }

}
