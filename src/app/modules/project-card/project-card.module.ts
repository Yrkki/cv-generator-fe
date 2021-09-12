// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectCardRoutingModule } from './project-card-routing.module';

import { ProjectCardComponent } from '../../components/project-card/project-card.component';

/** ProjectCard module. */
@NgModule({
  declarations: [ProjectCardComponent],
  imports: [
    CommonModule,
    ProjectCardRoutingModule,
  ],
  exports: [ProjectCardComponent]
})
export class ProjectCardModule { }
