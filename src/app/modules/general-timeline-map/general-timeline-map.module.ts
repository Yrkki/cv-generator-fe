import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralTimelineMapRoutingModule } from './general-timeline-map-routing.module';

import { GeneralTimelineMapComponent } from '../../components/general-timeline-map/general-timeline-map.component';

/** GeneralTimelineMap module. */
@NgModule({
  declarations: [GeneralTimelineMapComponent],
  imports: [
    CommonModule,
    GeneralTimelineMapRoutingModule,
  ],
  exports: [GeneralTimelineMapComponent]
})
export class GeneralTimelineMapModule { }
