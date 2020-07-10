import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectGanttChartRoutingModule } from './project-gantt-chart-routing.module';

import { ProjectGanttChartComponent } from '../../components/project-gantt-chart/project-gantt-chart.component';

/** ProjectGanttChart module. */
@NgModule({
  declarations: [ProjectGanttChartComponent],
  imports: [
    CommonModule,
    ProjectGanttChartRoutingModule,
  ],
  exports: [ProjectGanttChartComponent]
})
export class ProjectGanttChartModule { }
