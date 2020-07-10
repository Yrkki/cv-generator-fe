import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectContributionsComponent } from '../../components/project-contributions/project-contributions.component';
const routes: Routes = [  { path: '', component: ProjectContributionsComponent }
];

/**
 * ProjectContributions routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectContributionsRoutingModule { }
