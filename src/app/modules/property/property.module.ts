// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyProviderModule } from '../property-provider/property-provider.module';

import { PropertyRoutingModule } from './property-routing.module';

import { PropertyComponent } from '../../components/property/property.component';

/** Property module. */
@NgModule({
  declarations: [PropertyComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    PropertyProviderModule,
  ],
  exports: [PropertyComponent]
})
export class PropertyModule { }
