import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralTimelineRoutingModule } from './general-timeline-routing.module';
import { HeaderModule } from '../header/header.module';

import { GeneralTimelineComponent } from '../../components/general-timeline/general-timeline.component';

/** GeneralTimeline module. */
@NgModule({
  declarations: [GeneralTimelineComponent],
  imports: [
    CommonModule,
    GeneralTimelineRoutingModule,
    HeaderModule,
  ],
  exports: [GeneralTimelineComponent]
})
export class GeneralTimelineModule { }
