import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralTimelineMapRoutingModule } from './general-timeline-map-routing.module';
import { HeaderTitleModule } from '../header-title/header-title.module';

import { GeneralTimelineMapComponent } from '../../components/general-timeline-map/general-timeline-map.component';

/** GeneralTimelineMap module. */
@NgModule({
  declarations: [GeneralTimelineMapComponent],
  imports: [
    CommonModule,
    GeneralTimelineMapRoutingModule,
    HeaderTitleModule,
  ],
  exports: [GeneralTimelineMapComponent]
})
export class GeneralTimelineMapModule { }
