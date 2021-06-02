import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SorterModule } from '../sorter/sorter.module';

import { SpectrumProviderRoutingModule } from './spectrum-provider-routing.module';

import { SpectrumProviderComponent } from '../../components/spectrum-provider/spectrum-provider.component';

/** SpectrumProvider module. */
@NgModule({
  declarations: [SpectrumProviderComponent],
  imports: [
    CommonModule,
    SpectrumProviderRoutingModule,
    SorterModule,
  ],
  exports: [SpectrumProviderComponent]
})
export class SpectrumProviderModule { }
