// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SorterModule } from '../sorter/sorter.module';

import { ProjectContributionsRoutingModule } from './project-contributions-routing.module';
import { ProjectListModule } from '../project-list/project-list.module';

import { ProjectContributionsComponent } from '../../components/project-contributions/project-contributions.component';

/** ProjectContributions module. */
@NgModule({
  declarations: [ProjectContributionsComponent],
  imports: [
    CommonModule,
    ProjectContributionsRoutingModule,
    ProjectListModule,
    SorterModule,
  ],
  exports: [ProjectContributionsComponent]
})
export class ProjectContributionsModule { }
