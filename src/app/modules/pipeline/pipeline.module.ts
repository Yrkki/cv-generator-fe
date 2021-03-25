import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipelineRoutingModule } from './pipeline-routing.module';

import { PipelineComponent } from '../../components/pipeline/pipeline.component';
import { HeaderModule } from '../header/header.module';
import { BadgeModule } from '../badge/badge.module';

/** Pipeline module. */
@NgModule({
  declarations: [PipelineComponent],
  imports: [
    CommonModule,
    FormsModule,
    PipelineRoutingModule,
    HeaderModule,
    BadgeModule,
  ],
  exports: [PipelineComponent]
})
export class PipelineModule { }
