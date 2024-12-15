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
import { Component, AfterViewInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';

/**
 * reference-architecture component.
 * ~extends {@link FooterComponent}
 * ~implements {@link AfterViewInit}
 */
@Component({
  standalone:false,
  selector: 'app-reference-architecture',
  templateUrl: './reference-architecture.component.html',
  styleUrls: ['./reference-architecture.component.scss']
})
export class ReferenceArchitectureComponent extends FooterComponent implements AfterViewInit {
  /** The component key */
  public override get key() { return 'Reference architecture'; }

  /**
   * Constructs the reference-architecture component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   */
  constructor(
    public override portfolioService: PortfolioService,
    public override entitiesService: EntitiesService,
    public override inputService: InputService,
    public override uiService: UiService,
    public override persistenceService: PersistenceService,
    public override dataService: DataService
  ) {
    super(portfolioService, entitiesService, inputService, uiService, persistenceService, dataService);
  }
}
