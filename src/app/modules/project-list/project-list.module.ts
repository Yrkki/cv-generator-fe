// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SorterModule } from '../sorter/sorter.module';

import { ProjectListRoutingModule } from './project-list-routing.module';

import { ProjectListComponent } from '../../components/project-list/project-list.component';

/** ProjectList module. */
@NgModule({
  declarations: [ProjectListComponent],
  imports: [
    CommonModule,
    ProjectListRoutingModule,
    SorterModule,
  ],
  exports: [ProjectListComponent]
})
export class ProjectListModule { }
