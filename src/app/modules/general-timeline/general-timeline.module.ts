import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { GeneralTimelineComponent } from '../../components/general-timeline/general-timeline.component';
import { GeneralTimelineMapComponent } from '../../components/general-timeline-map/general-timeline-map.component';
import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

export const ROUTES: Routes = [
  { path: 'GeneralTimeline', component: GeneralTimelineComponent },
  { path: 'GeneralTimelineMap', component: GeneralTimelineMapComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  exports: [GeneralTimelineComponent, GeneralTimelineMapComponent],
  declarations: [GeneralTimelineComponent, GeneralTimelineMapComponent],
  providers: [PortfolioComponent]
})
export class GeneralTimelineModule { }
