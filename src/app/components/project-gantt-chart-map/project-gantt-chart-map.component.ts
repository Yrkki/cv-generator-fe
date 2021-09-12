// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Component } from '@angular/core';

import { ProjectGanttChartComponent } from '../project-gantt-chart/project-gantt-chart.component';

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
   */
  constructor() {
    // console.log('Debug: ProjectGanttChartMapComponent: constructor: constructing...');

    super();
    this.key += ' Map';
  }
}
