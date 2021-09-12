// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpectrumProviderModule } from '../spectrum-provider/spectrum-provider.module';
import { SorterModule } from '../sorter/sorter.module';

import { SpectrumRoutingModule } from './spectrum-routing.module';

import { SpectrumComponent } from '../../components/spectrum/spectrum.component';

/** Spectrum module. */
@NgModule({
  declarations: [SpectrumComponent],
  imports: [
    CommonModule,
    SpectrumRoutingModule,
    SpectrumProviderModule,
    SorterModule,
  ],
  exports: [SpectrumComponent]
})
export class SpectrumModule { }
