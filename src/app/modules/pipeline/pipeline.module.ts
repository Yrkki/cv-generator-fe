import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipelineRoutingModule } from './pipeline-routing.module';

import { PipelineComponent } from '../../components/pipeline/pipeline.component';
import { GeolocationModule } from '../geolocation/geolocation.module';

/** Pipeline module. */
@NgModule({
  declarations: [PipelineComponent],
  imports: [
    CommonModule,
    FormsModule,
    PipelineRoutingModule,
    GeolocationModule,
  ],
  exports: [PipelineComponent]
})
export class PipelineModule { }
