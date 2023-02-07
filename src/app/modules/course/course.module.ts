// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
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
import { CommonModule, DatePipe } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { IndexModule } from '../index/index.module';
import { CourseListModule } from '../course-list/course-list.module';
import { CategoryModule } from '../category/category.module';

import { CourseComponent } from '../../components/course/course.component';

import { SelectorHeaderModule } from '../selector-header/selector-header.module';

/** Course module. */
@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    IndexModule,
    CourseListModule,
    CategoryModule,
    SelectorHeaderModule,
  ],
  providers: [
    DatePipe,
  ],
  exports: [CourseComponent, DatePipe],
})
export class CourseModule { }
