// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralTimelineMapRoutingModule } from './general-timeline-map-routing.module';
import { HeaderModule } from '../header/header.module';

import { GeneralTimelineMapComponent } from '../../components/general-timeline-map/general-timeline-map.component';

/** GeneralTimelineMap module. */
@NgModule({
  declarations: [GeneralTimelineMapComponent],
  imports: [
    CommonModule,
    GeneralTimelineMapRoutingModule,
    HeaderModule,
  ],
  exports: [GeneralTimelineMapComponent]
})
export class GeneralTimelineMapModule { }
