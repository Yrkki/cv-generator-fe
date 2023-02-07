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
import { Injectable } from '@angular/core';

import { Cv as CV } from '../../classes/cv/cv';

import { Project } from '../../interfaces/project/project';

import { GeneralTimelineEntry } from '../../classes/general-timeline-entry/general-timeline-entry';

/**
 * A portfolio model.
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioModel {
  /** CV data. */
  public cv = new CV();

  /** Projects data. */
  public projects = new Array<Project>();

  /** General timeline data. */
  public generalTimeline = new Array<GeneralTimelineEntry>();

  /**
   * Constructs the portfolio model.
   * ~constructor
   */
  constructor(
  ) {
  }
}
