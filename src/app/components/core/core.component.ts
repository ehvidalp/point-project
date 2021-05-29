import { Marker } from 'src/app/interfaces/marker';
import { Component, OnInit } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  marker!: Address;
  markerInfo!: Address;
  markersDistances: Partial<Marker>[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getMarker(adress: Address){
    this.marker = adress
  }

  getInfoMarker(markerInfo: Address){
    this.markerInfo = markerInfo;
  }

  getMarkersDistances(markersDitances: Partial<Marker>[]){
    this.markersDistances = markersDitances
  }

}
