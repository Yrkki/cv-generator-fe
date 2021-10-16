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
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectGanttChartModule } from '../project-gantt-chart/project-gantt-chart.module';
import { ProjectContributionsModule } from '../project-contributions/project-contributions.module';
import { ProjectListModule } from '../project-list/project-list.module';
import { ProjectIndexModule } from '../project-index/project-index.module';
import { ProjectCardModule } from '../project-card/project-card.module';
import { SorterModule } from '../sorter/sorter.module';
import { HeaderModule } from '../header/header.module';
import { HeaderTitleModule } from '../header-title/header-title.module';

import { ProjectComponent } from '../../components/project/project.component';

/** Project module. */
@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ProjectGanttChartModule,
    ProjectContributionsModule,
    ProjectListModule,
    ProjectIndexModule,
    ProjectCardModule,
    SorterModule,
    HeaderModule,
    HeaderTitleModule,
  ],
  exports: [ProjectComponent]
})
export class ProjectModule { }
