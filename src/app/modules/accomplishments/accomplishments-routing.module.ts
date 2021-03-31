import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccomplishmentsComponent } from '../../components/accomplishments/accomplishments.component';
const routes: Routes = [
  { path: '', component: AccomplishmentsComponent },
  { path: 'language', loadChildren: () => import('../language/language.module').then((m) => m.LanguageModule) },
  { path: 'course', loadChildren: () => import('../course/course.module').then((m) => m.CourseModule) },
  { path: 'general-timeline-map',
    loadChildren: () => import('../general-timeline-map/general-timeline-map.module').then((m) => m.GeneralTimelineMapModule) },
  { path: 'publication',
    loadChildren: () => import('../publication/publication.module').then((m) => m.PublicationModule) },
  { path: 'project-gantt-chart-map',
    loadChildren: () => import('../project-gantt-chart-map/project-gantt-chart-map.module').then((m) => m.ProjectGanttChartMapModule) },
  { path: 'project-contributions',
    loadChildren: () => import('../project-contributions/project-contributions.module').then((m) => m.ProjectContributionsModule) }
];

/**
 * Accomplishments routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccomplishmentsRoutingModule { }
