import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Marker } from 'src/app/interfaces/marker';

declare var google: any

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() getMarker!: Address
  loading: boolean = true;
  map = null;
  defaultMarker: Partial<Marker> = { position: { lat: 14.604697599999998, lng: -90.5347072 } }
  markers: Marker[] = []
  address: Address[] = []

  constructor(
  ) { }

  ngOnInit(): void {
    this.loadMap()
  }

  //changes in get marker variable
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.getMarker.currentValue) {
      if (this.getMarker !== undefined) {
        const marker: Marker = {
          position: { lat: this.getMarker.geometry.location.lat(), lng: this.getMarker.geometry.location.lng() },
          title: this.getMarker.name
        }
        this.markers.push(marker)
        this.loadMap(true)
      }
    }
  }

  loadMap(isAddMarker: boolean = false) {
    const mapElement: HTMLElement = document.getElementById('map')!;

    this.map = new google.maps.Map(mapElement, {
      center: isAddMarker? this.markers[this.markers.length - 1].position: this.defaultMarker.position,
      zoom: 13,
      disableDefaultUI: true,
      mapId: '6fcd2e28f7ef88af' //map id from google maps
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      if (isAddMarker) {
        this.renderMarkers()
        console.log('si entro we yo viks')
      }
      mapElement.classList.add('show-map');
      this.loading = false
    });

  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

}
