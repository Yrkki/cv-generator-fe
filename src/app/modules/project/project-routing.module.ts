import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectComponent } from '../../components/project/project.component';
const routes: Routes = [  { path: '', component: ProjectComponent },
{ path: 'project-gantt-chart',
  loadChildren: () => import('../project-gantt-chart/project-gantt-chart.module').then(m => m.ProjectGanttChartModule) },
{ path: 'project-list', loadChildren: () => import('../project-list/project-list.module').then(m => m.ProjectListModule) },
{ path: 'project-index', loadChildren: () => import('../project-index/project-index.module').then(m => m.ProjectIndexModule) },
{ path: 'project-card', loadChildren: () => import('../project-card/project-card.module').then(m => m.ProjectCardModule) }
];

/**
 * Project routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
