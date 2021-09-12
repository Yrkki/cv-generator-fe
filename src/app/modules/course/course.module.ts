// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseIndexModule } from '../course-index/course-index.module';
import { CourseListModule } from '../course-list/course-list.module';

import { CourseComponent } from '../../components/course/course.component';

/** Course module. */
@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    CourseIndexModule,
    CourseListModule
  ],
  exports: [CourseComponent, DatePipe],
  providers: [DatePipe]
})
export class CourseModule { }
