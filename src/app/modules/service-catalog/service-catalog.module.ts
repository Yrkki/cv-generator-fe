import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServiceCatalogRoutingModule } from './service-catalog-routing.module';

import { ServiceCatalogComponent } from '../../components/service-catalog/service-catalog.component';
import { ExpandToggleModule } from '../expand-toggle/expand-toggle.module';
import { BadgeModule } from '../badge/badge.module';

/** ServiceCatalog module. */
@NgModule({
  declarations: [ServiceCatalogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ServiceCatalogRoutingModule,
    ExpandToggleModule,
    BadgeModule,
  ],
  exports: [ServiceCatalogComponent]
})
export class ServiceCatalogModule { }
