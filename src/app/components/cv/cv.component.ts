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
import { Component, Injector, AfterViewInit } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';

/**
 * CV component
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements AfterViewInit {
  /** The injector cache holder */
  private injectorCache = {};

  /**
   * Constructs a CV component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param injector The injector injected dependency.
   * @param componentOutletInjectorService The component outlet injector service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    private persistenceService: PersistenceService,
    private injector: Injector,
    private componentOutletInjectorService: ComponentOutletInjectorService) {
    componentOutletInjectorService.init(injector, this.injectorCache);
  }

  /** AfterViewInit handler */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    ['Curriculum Vitae'].forEach((_) => this.persistenceService.restoreToggle(document, _));
  }

  /** Save toggle delegate. */
  saveToggle(event: MouseEvent) {
    this.persistenceService.saveToggle(event);
  }
}
