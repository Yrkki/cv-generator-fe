import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SorterModule } from '../sorter/sorter.module';

import { ProjectContributionsRoutingModule } from './project-contributions-routing.module';

import { ProjectContributionsComponent } from '../../components/project-contributions/project-contributions.component';

/** ProjectContributions module. */
@NgModule({
  declarations: [ProjectContributionsComponent],
  imports: [
    CommonModule,
    ProjectContributionsRoutingModule,
    SorterModule,
  ],
  exports: [ProjectContributionsComponent]
})
export class ProjectContributionsModule { }
