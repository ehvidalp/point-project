import { Component, OnInit } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  marker!: Address

  constructor() { }

  ngOnInit(): void {
  }

  getMarker(adress: Address){
    this.marker = adress
  }

}
