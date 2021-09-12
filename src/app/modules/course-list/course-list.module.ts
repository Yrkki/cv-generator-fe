// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseListRoutingModule } from './course-list-routing.module';

import { CourseListComponent } from '../../components/course-list/course-list.component';

/** CourseList module. */
@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule,
    CourseListRoutingModule,
  ],
  exports: [CourseListComponent]
})
export class CourseListModule { }
