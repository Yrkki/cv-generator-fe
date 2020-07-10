import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectGanttChartMapComponent } from '../../components/project-gantt-chart-map/project-gantt-chart-map.component';
const routes: Routes = [  { path: '', component: ProjectGanttChartMapComponent }
];

/**
 * ProjectGanttChartMap routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectGanttChartMapRoutingModule { }
