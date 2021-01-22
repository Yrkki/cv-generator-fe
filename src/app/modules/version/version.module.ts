import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VersionRoutingModule } from './version-routing.module';

import { VersionComponent } from '../../components/version/version.component';
import { GeolocationModule } from '../geolocation/geolocation.module';

/** Version module. */
@NgModule({
  declarations: [VersionComponent],
  imports: [
    CommonModule,
    FormsModule,
    VersionRoutingModule,
    GeolocationModule,
  ],
  exports: [VersionComponent]
})
export class VersionModule { }
