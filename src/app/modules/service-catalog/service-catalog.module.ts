import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServiceCatalogRoutingModule } from './service-catalog-routing.module';

import { ServiceCatalogComponent } from '../../components/service-catalog/service-catalog.component';
import { GeolocationModule } from '../geolocation/geolocation.module';

/** ServiceCatalog module. */
@NgModule({
  declarations: [ServiceCatalogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ServiceCatalogRoutingModule,
    GeolocationModule,
  ],
  exports: [ServiceCatalogComponent]
})
export class ServiceCatalogModule { }
