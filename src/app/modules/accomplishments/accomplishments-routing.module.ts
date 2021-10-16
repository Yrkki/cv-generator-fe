// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
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
