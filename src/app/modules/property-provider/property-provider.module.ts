// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyProviderRoutingModule } from './property-provider-routing.module';

import { PropertyProviderComponent } from '../../components/property-provider/property-provider.component';

/** PropertyProvider module. */
@NgModule({
  declarations: [PropertyProviderComponent],
  imports: [
    CommonModule,
    PropertyProviderRoutingModule,
  ],
  exports: [PropertyProviderComponent]
})
export class PropertyProviderModule { }
