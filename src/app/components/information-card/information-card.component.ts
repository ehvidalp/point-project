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

  constructor() { }

  ngOnInit(): void {

  }

   //changes in get markerInfo variable or mardersDistances
   ngOnChanges(changes: SimpleChanges): void {
    if (changes.markerInfo.currentValue) {
      if (this.markerInfo !== undefined) {
        console.log('info we',this.markerInfo)
        console.log('distances',this.markersDistances)
      }
    }
  }
}
