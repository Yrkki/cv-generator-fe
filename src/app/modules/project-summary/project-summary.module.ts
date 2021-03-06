import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectSummaryRoutingModule } from './project-summary-routing.module';
import { SpectrumModule } from '../spectrum/spectrum.module';
import { MapModule } from '../map/map.module';
import { SorterModule } from '../sorter/sorter.module';

import { ProjectSummaryComponent } from '../../components/project-summary/project-summary.component';

/** ProjectSummary module. */
@NgModule({
  declarations: [ProjectSummaryComponent],
  imports: [
    CommonModule,
    ProjectSummaryRoutingModule,
    SpectrumModule,
    MapModule,
    SorterModule,
  ],
  exports: [ProjectSummaryComponent]
})
export class ProjectSummaryModule { }
