import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectSummaryComponent } from '../../components/project-summary/project-summary.component';
const routes: Routes = [  { path: '', component: ProjectSummaryComponent },
{ path: 'spectrum', loadChildren: () => import('../spectrum/spectrum.module').then((m) => m.SpectrumModule) },
{ path: 'map', loadChildren: () => import('../map/map.module').then((m) => m.MapModule) }
];

/**
 * ProjectSummary routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectSummaryRoutingModule { }
