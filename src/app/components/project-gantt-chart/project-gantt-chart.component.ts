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

import { PortfolioService } from '../../services/portfolio/portfolio.service';

/**
 * Project gantt chart component.
 */
@Component({
  standalone:false,
  selector: 'app-project-gantt-chart',
  templateUrl: './project-gantt-chart.component.html',
  styleUrls: ['./project-gantt-chart.component.scss']
})
export class ProjectGanttChartComponent {
  /** The component key */
  public key = 'Project Gantt';

  /**
   * Constructs a General timeline component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   */
   constructor(
    public readonly portfolioService: PortfolioService,
  ) {
  }
}
