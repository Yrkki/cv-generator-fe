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
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { Params } from '../../services/component-outlet-injector/params';

/**
 * Selector header component
 * ~extends {@link PropertyComponent}
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-selector-header',
  templateUrl: './selector-header.component.html',
  styleUrls: ['./selector-header.component.scss']
})
export class SelectorHeaderComponent extends PropertyComponent implements AfterViewInit {
  /** The component key */
  #key = 'key';
  /** The component key getter */
  public get key() { return this.#key; }
  /** The component key setter */
  @Input() public set key(value) { this.#key = value?.substr(0, 50) ?? ''; }

  /** Clickable element. */
  @ViewChild('clickable') clickable?: ElementRef<HTMLDivElement>;

  /**
   * Constructs the Professional experience component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param toolbarService The toolbar service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly toolbarService: ToolbarService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly persistenceService: PersistenceService,
    public readonly dataService: DataService,
    public readonly excelDateFormatterService: ExcelDateFormatterService,
    public readonly params?: Params) {
    super(portfolioService, inputService, uiService, dataService, excelDateFormatterService, params);
  }

  /** Initialization */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    this.persistenceService.restoreToggle(document, this.key, this.key);
  }
}
