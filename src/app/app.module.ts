import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MapComponent } from './components/map/map.component';
import { InformationCardComponent } from './components/information-card/information-card.component';
import { CoreComponent } from './components/core/core.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//sweet alert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

//loading component
import { NgxLoadingModule } from 'ngx-loading';

//Google maps
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

//material
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent,
    InformationCardComponent,
    CoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    GooglePlaceModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxLoadingModule.forRoot({}),
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
