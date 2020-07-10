import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpectrumRoutingModule } from './spectrum-routing.module';

import { SpectrumComponent } from '../../components/spectrum/spectrum.component';

/** Spectrum module. */
@NgModule({
  declarations: [SpectrumComponent],
  imports: [
    CommonModule,
    SpectrumRoutingModule,
  ],
  exports: [SpectrumComponent]
})
export class SpectrumModule { }
