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
import { Component, Inject, Input } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

import { EngineService } from '../../services/engine/engine.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';

import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';
import { Project } from '../../interfaces/project/project';

/**
 * Project index component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-project-index',
  templateUrl: './project-index.component.html',
  styleUrls: ['./project-index.component.scss']
})
export class ProjectIndexComponent extends PropertyComponent {
  /** Index when part of a collection */
  @Input() i = 0;

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** Main component name delegate. */
  public get componentName() { return this.uiService.componentName; }

  /** Filtered delegate. */
  public get filtered() { return this.portfolioService.model.filtered; }

  /**
   * Constructs the Project index component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    public override readonly portfolioService: PortfolioService,
    public readonly engine: EngineService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Projects)) public readonly sorterService: SorterService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Pp)) public readonly truncatorService: TruncatorService,
    public override readonly inputService: InputService,
    public override readonly uiService: UiService,
    public override readonly dataService: DataService,
    public override readonly excelDateFormatterService: ExcelDateFormatterService,
  ) {
    super(portfolioService, inputService, uiService, dataService, excelDateFormatterService);
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }

  /** Frequency getter. */
  public frequency(project: Project) {
    return this.engine.filterService.projectFrequency(project);
  }

  /** Frequency style delegate. */
  public getFrequencyStyle(frequency: any[]) {
    return this.uiService.getFrequencyStyle(frequency, this.truncatorService.TagCloudEmphasis);
  }
}
