import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectContributionsRoutingModule } from './project-contributions-routing.module';

import { ProjectContributionsComponent } from '../../components/project-contributions/project-contributions.component';

/** ProjectContributions module. */
@NgModule({
  declarations: [ProjectContributionsComponent],
  imports: [
    CommonModule,
    ProjectContributionsRoutingModule,
  ],
  exports: [ProjectContributionsComponent]
})
export class ProjectContributionsModule { }
