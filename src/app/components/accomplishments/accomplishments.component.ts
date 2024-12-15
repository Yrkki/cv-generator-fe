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
import { Component, AfterViewInit, ViewChildren, QueryList } from '@angular/core';

import { AccomplishmentsProviderComponent } from '../accomplishments-provider/accomplishments-provider.component';

import { ToggleKind } from '../../enums/toggle-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { AccomplishmentsService } from '../../services/accomplishments/accomplishments.service';

import { HeaderComponent } from '../header/header.component';

/**
 * Accomplishments component.
 * ~extends {@link AccomplishmentsProviderComponent}
 * ~implements {@link AfterViewInit}
 */
@Component({
  standalone:false,
  selector: 'app-accomplishments',
  templateUrl: './accomplishments.component.html',
  styleUrls: ['./accomplishments.component.scss']
})
export class AccomplishmentsComponent extends AccomplishmentsProviderComponent implements AfterViewInit {
  /** Header component. */
  @ViewChildren(HeaderComponent) headerComponents?: QueryList<HeaderComponent>;

  /** Filtered delegate. */
  public get filtered() { return this.portfolioService.model.filtered; }

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** The state of the dependencies determining whether should collapse the projects accomplishments section delegate. */
  private get projectsAccomplishmentShouldCollapseState() { return this.accomplishmentsService.projectsAccomplishmentShouldCollapseState; }

  /**
   * Constructs the Accomplishments component.
   * ~constructor
   *
   * @param accomplishmentsService The accomplishments service injected dependency.
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    private readonly accomplishmentsService: AccomplishmentsService,
    public override readonly portfolioService: PortfolioService,
    public override readonly entitiesService: EntitiesService,
    public override readonly inputService: InputService,
    public override readonly uiService: UiService,
    protected override readonly persistenceService: PersistenceService,
  ) {
    super(portfolioService, entitiesService, inputService, uiService, persistenceService);
  }

  /** AfterViewInit handler */
  ngAfterViewInit() {
    // initialize whether should collapse the projects accomplishments section
    this.updateShouldCollapseProjectsAccomplishment('Accomplishments');

    this.Initialize();
  }

  /** Initialization */
  // eslint-disable-next-line max-lines-per-function
  Initialize() {
    ['Accomplishments',
    ].forEach((_) => this.persistenceService.restoreToggle(document, _));
  }

  /**
   * Update whether should collapse the projects accomplishments section.
   *
   * @param typeName The projects owner section id.
   */
  public updateShouldCollapseProjectsAccomplishment(typeName: string) {
    this.projectsAccomplishmentShouldCollapseState[typeName] =
      this.persistenceService.getToggle(typeName)['content-class'] === 'collapse';
  }
}
