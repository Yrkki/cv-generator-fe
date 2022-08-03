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
import { Component } from '@angular/core';

import { ProjectGanttChartComponent } from '../project-gantt-chart/project-gantt-chart.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

/**
 * Project gantt chart map component.
 * ~extends {@link ProjectGanttChartComponent}
 */
@Component({
  selector: 'app-project-gantt-chart-map',
  templateUrl: './project-gantt-chart-map.component.html',
  styleUrls: ['./project-gantt-chart-map.component.scss']
})
export class ProjectGanttChartMapComponent extends ProjectGanttChartComponent {
  /**
   * Constructs a Project gantt chart map component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
  ) {
    super(portfolioService);
    this.key += ' Map';
  }
}
