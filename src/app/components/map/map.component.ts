import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Output() markersDistances = new EventEmitter<Partial<Marker>[]>();
  @Output() inforMarker = new EventEmitter<Address>();



  loading: boolean = true;
  map = null;
  defaultMarker: Partial<Marker> = { position: { lat: 14.604697599999998, lng: -90.5347072 } }
  addresses: Address[] = []
  directionsService = new google.maps.DirectionsService();

  constructor() { }

  ngOnInit(): void {
    this.loadMap()
  }

  //changes in get marker variable
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.getMarker.currentValue) {
      if (this.getMarker !== undefined) {
        //add address to addresses array
        this.addresses.push(this.getMarker)
        this.loadMap(true)
      }
    }
  }

  loadMap(isAddMarker: boolean = false) {
    const mapElement: HTMLElement = document.getElementById('map')!;
    this.loading = true;

    this.map = new google.maps.Map(mapElement, {
      center: isAddMarker ? this.addresses[this.addresses.length - 1].geometry.location : this.defaultMarker.position,
      zoom: 15,
      disableDefaultUI: true,
      mapId: '6fcd2e28f7ef88af' //map id from google maps
    });


    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      if (isAddMarker) this.renderMarkers()
      mapElement.classList.add('show-map');
      this.loading = false
    });

  }

  renderMarkers(iconUrl = '../../../assets/svg/circle-pink.svg') {
    this.addresses.forEach(address => {
      let marker = this.addMarker(address, iconUrl)
      marker.addListener('click', () => {
        this.renderMarkers('../../../assets/svg/circle-pink-opacity.svg')
        marker = this.addMarker(address, '../../../assets/svg/circle-red.svg')
        this.calculateRoutes(address)
        return;
      })

    });
  }

  addMarker(address: Address, iconUrl: string) {
    const marker: Marker = {
      position: { lat: address.geometry.location.lat(), lng: address.geometry.location.lng() },
      title: address.name,
      map: this.map
    }
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
      icon: iconUrl,
    })
  }

  calculateRoutes(origin: Address) {
    let dataDistances: Marker[] = []
    if (this.addresses.length > 1) {
      this.addresses.forEach(async address => {
        await this.directionsService.route({
          origin: { lat: origin.geometry.location.lat(), lng: origin.geometry.location.lng() },
          destination: { lat: address.geometry.location.lat(), lng: address.geometry.location.lng() },
          travelMode: google.maps.TravelMode.DRIVING
        }, (response: any, status: any) => {
          if (status === google.maps.DirectionsStatus.OK) {
            const distance = response.routes[0].legs[0].distance.value
            if (distance !== '1 m')
              dataDistances.push({ distanceFromOrigin: distance, title: address.name, photo: address.photos[0].getUrl({ maxHeight: 100, maxWidth: 100 }) })
          }
        })
      })
    }

    this.sendDataToCard(origin, dataDistances)
  }

  sendDataToCard(infoMarker: Address, markersDistances: Marker[]) {
    this.inforMarker.emit(infoMarker)
    this.markersDistances.emit(markersDistances)
  }

}
