// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServiceCatalogRoutingModule } from './service-catalog-routing.module';

import { ServiceCatalogComponent } from '../../components/service-catalog/service-catalog.component';
import { HeaderModule } from '../header/header.module';
import { BadgeModule } from '../badge/badge.module';

/** ServiceCatalog module. */
@NgModule({
  declarations: [ServiceCatalogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ServiceCatalogRoutingModule,
    HeaderModule,
    BadgeModule,
  ],
  exports: [ServiceCatalogComponent]
})
export class ServiceCatalogModule { }
