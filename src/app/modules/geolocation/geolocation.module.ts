import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeolocationRoutingModule } from './geolocation-routing.module';
import { GeolocationComponent } from '../../components/geolocation/geolocation.component';

/** Geolocation module. */
@NgModule({
  declarations: [GeolocationComponent],
  imports: [
    CommonModule,
    GeolocationRoutingModule
  ],
  exports: [GeolocationComponent]
})
export class GeolocationModule { }
