// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseIndexRoutingModule } from './course-index-routing.module';

import { CourseIndexComponent } from '../../components/course-index/course-index.component';

/** CourseIndex module. */
@NgModule({
  declarations: [CourseIndexComponent],
  imports: [
    CommonModule,
    CourseIndexRoutingModule,
  ],
  exports: [CourseIndexComponent]
})
export class CourseIndexModule { }
