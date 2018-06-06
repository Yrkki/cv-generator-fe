import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { GeneralTimelineComponent } from '../../components/general-timeline/general-timeline.component';
import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

export const ROUTES: Routes = [{ path: 'GeneralTimeline', component: GeneralTimelineComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  exports: [GeneralTimelineComponent],
  declarations: [GeneralTimelineComponent],
  providers: [PortfolioComponent]
})
export class GeneralTimelineModule { }
