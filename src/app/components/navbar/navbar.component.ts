import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild("placesRef") placesRef!: GooglePlaceDirective;
  @Output() marker = new EventEmitter<Address>()
  @ViewChild("inputSearch") inputSearch!: ElementRef;
  isSearched = false;
  markerAddress: Address | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  getAddress(address: Address) {
    this.markerAddress = address
    if(address.url === undefined) Swal.fire('Por favor ingrese una dirección correcta');
    else {
      this.marker.emit(address);
      this.isSearched = true;
    }
  }

  newSearch(){
    this.inputSearch.nativeElement.focus()
    this.inputSearch.nativeElement.value = ''
  }

  confirmationDeleteMarkers() {
    Swal.fire({
      title: '¿Está seguro que desea borrar todos los marcadores?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      cancelButtonColor: '#373b3a',
      confirmButtonColor: '#1556f9',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.inputSearch.nativeElement.value = ''
        this.marker.emit(undefined)
        this.isSearched = false;
      }
    });
  }
}
