import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SorterModule } from '../sorter/sorter.module';

import { SpectrumRoutingModule } from './spectrum-routing.module';

import { SpectrumComponent } from '../../components/spectrum/spectrum.component';

/** Spectrum module. */
@NgModule({
  declarations: [SpectrumComponent],
  imports: [
    CommonModule,
    SpectrumRoutingModule,
    SorterModule,
  ],
  exports: [SpectrumComponent]
})
export class SpectrumModule { }
