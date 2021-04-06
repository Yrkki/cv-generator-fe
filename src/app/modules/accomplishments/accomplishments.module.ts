import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccomplishmentsRoutingModule } from './accomplishments-routing.module';
import { LanguageModule } from '../language/language.module';
import { CourseModule } from '../course/course.module';
import { GeneralTimelineMapModule } from '../general-timeline-map/general-timeline-map.module';
import { PublicationModule } from '../publication/publication.module';
import { ProjectGanttChartMapModule } from '../project-gantt-chart-map/project-gantt-chart-map.module';
import { ProjectContributionsModule } from '../project-contributions/project-contributions.module';
import { SorterModule } from '../sorter/sorter.module';
import { HeaderTitleModule } from '../header-title/header-title.module';

import { AccomplishmentsComponent } from '../../components/accomplishments/accomplishments.component';

/** Accomplishments module. */
@NgModule({
  declarations: [AccomplishmentsComponent],
  imports: [
    CommonModule,
    AccomplishmentsRoutingModule,
    LanguageModule,
    CourseModule,
    GeneralTimelineMapModule,
    PublicationModule,
    ProjectGanttChartMapModule,
    ProjectContributionsModule,
    SorterModule,
    HeaderTitleModule,
  ],
  exports: [AccomplishmentsComponent]
})
export class AccomplishmentsModule { }
