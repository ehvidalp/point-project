import { Marker } from 'src/app/interfaces/marker';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';;

@Component({
  selector: 'information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss']
})
export class InformationCardComponent implements OnInit {
  @Input() markerInfo!: Address;
  @Input() markersDistances: Partial<Marker>[] = [];
  likeMarker = false;
  showFullCard = false;
  showDistances = false;

  constructor() { }

  ngOnInit(): void {

  }

   //changes in get markerInfo or markersDistances
   ngOnChanges(changes: SimpleChanges): void {
    if(this.markerInfo === undefined) {
      this.likeMarker = false;
      this.showFullCard = false;
      this.showDistances = false;
    }
  }

}
