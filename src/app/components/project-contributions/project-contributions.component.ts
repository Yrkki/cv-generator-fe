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
import { Component, Inject } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

import { EngineService } from '../../services/engine/engine.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';

import { UiService } from '../../services/ui/ui.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { ProjectListComponent } from '../project-list/project-list.component';

/**
 * Project contributions component
 * ~extends {@link ProjectListComponent}
 */
@Component({
  standalone: false,
  selector: 'app-project-contributions',
  templateUrl: './project-contributions.component.html',
  styleUrls: ['./project-contributions.component.scss']
})
export class ProjectContributionsComponent extends ProjectListComponent {
  /** Date format */
  public override get dateFormat() { return this.uiService.localizationService.dateFormatShort; }

  /**
   * Constructs the Project component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    public override readonly portfolioService: PortfolioService,
    protected override readonly engine: EngineService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Projects)) public override readonly sorterService: SorterService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Pp)) public override readonly truncatorService: TruncatorService,
    protected override readonly uiService: UiService,
    protected override readonly excelDateFormatterService: ExcelDateFormatterService,
  ) {
    super(portfolioService, engine, sorterService, truncatorService, uiService, excelDateFormatterService);
  }
}
