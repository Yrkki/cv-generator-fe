import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectGanttChartMapRoutingModule } from './project-gantt-chart-map-routing.module';

import { ProjectGanttChartMapComponent } from '../../components/project-gantt-chart-map/project-gantt-chart-map.component';

/** ProjectGanttChartMap module. */
@NgModule({
  declarations: [ProjectGanttChartMapComponent],
  imports: [
    CommonModule,
    ProjectGanttChartMapRoutingModule,
  ],
  exports: [ProjectGanttChartMapComponent]
})
export class ProjectGanttChartMapModule { }
