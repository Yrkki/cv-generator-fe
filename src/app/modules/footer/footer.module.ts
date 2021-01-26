import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FooterRoutingModule } from './footer-routing.module';

import { FooterComponent } from '../../components/footer/footer.component';
import { GeolocationModule } from '../geolocation/geolocation.module';
import { PipelineModule } from '../pipeline/pipeline.module';
import { ServiceCatalogModule } from '../service-catalog/service-catalog.module';
import { VersionModule } from '../version/version.module';
import { BadgeModule } from '../badge/badge.module';

/** Footer module. */
@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    FooterRoutingModule,
    GeolocationModule,
    PipelineModule,
    ServiceCatalogModule,
    VersionModule,
    BadgeModule,
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
