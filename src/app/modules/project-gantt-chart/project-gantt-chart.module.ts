import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProjectGanttChartComponent } from '../../components/project-gantt-chart/project-gantt-chart.component';
import { ProjectGanttChartMapComponent } from '../../components/project-gantt-chart-map/project-gantt-chart-map.component';
import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

export const ROUTES: Routes = [
  { path: 'ProjectGanttChart', component: ProjectGanttChartComponent },
  { path: 'ProjectGanttChartMap', component: ProjectGanttChartMapComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  exports: [ProjectGanttChartComponent, ProjectGanttChartMapComponent],
  declarations: [ProjectGanttChartComponent, ProjectGanttChartMapComponent],
  providers: [PortfolioComponent]
})
export class ProjectGanttChartModule { }
