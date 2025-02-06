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
import { Component, AfterViewInit, ViewChildren, QueryList, Inject, Input, ViewChild, ElementRef } from '@angular/core';

import { AccomplishmentsProviderComponent } from '../accomplishments-provider/accomplishments-provider.component';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';
import { ToggleKind } from '../../enums/toggle-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { HeaderComponent } from '../header/header.component';

import { Accomplishment } from '../../interfaces/cv/accomplishment';

/**
 * Accomplishment component.
 * ~extends {@link AccomplishmentProviderComponent}
 * ~implements {@link AfterViewInit}
 */
@Component({
  standalone: false,
  selector: 'app-accomplishment',
  templateUrl: './accomplishment.component.html',
  styleUrls: ['./accomplishment.component.scss']
})
export class AccomplishmentComponent extends AccomplishmentsProviderComponent implements AfterViewInit {
  /** The component accomplishment type */
  @Input() public accomplishmentType!: string;

  /** The component filtered accomplishments */
  @Input() public filtered!: Accomplishment[];

  /** Header component. */
  @ViewChildren(HeaderComponent) headerComponents?: QueryList<HeaderComponent>;

  /** Classifier Kind clickable element. */
  @ViewChild('classifierKind') classifierKind?: ElementRef<HTMLElement>;

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /**
   * Constructs the Accomplishment component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public override readonly portfolioService: PortfolioService,
    public override readonly entitiesService: EntitiesService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Accomplishments)) public readonly sorterService: SorterService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Cv)) public readonly truncatorService: TruncatorService,
    public override readonly inputService: InputService,
    public override readonly uiService: UiService,
    protected override readonly persistenceService: PersistenceService,
  ) {
    super(portfolioService, entitiesService, inputService, uiService, persistenceService);
  }

  /** AfterViewInit handler */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    [
      'Certifications', 'Certifications Index', 'Certifications List',
      'Languages', 'Languages Index', 'Languages List', 'Languages Chart',

      'Courses', 'Courses Index', 'Courses List',
      'Organizations', 'Organizations Index', 'Organizations List',
      'Honors and Awards', 'Honors and Awards Index', 'Honors and Awards List',
      'Volunteering', 'Volunteering Index', 'Volunteering List',
      'Interests and Hobbies', 'Interests and Hobbies Index', 'Interests and Hobbies List',
      'Vacation', 'Vacation Index', 'Vacation List'
    ].forEach((_) => this.persistenceService.restoreToggle(document, _));
  }

  /**
   * Rotate classifier kind changer.
   *
   * @param event The initiating click event.
   */
  public rotateClassifierKind(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!(
      target.classList.contains('classifier')
      || target.classList.contains('clickableClassifierKind')
      // tslint:disable-next-line: no-non-null-assertion
      || target.parentElement!.classList.contains('clickableClassifierKind')
      // tslint:disable-next-line: no-non-null-assertion
      || target.parentElement!.parentElement!.classList.contains('clickableClassifierKind')
    )) { return; }

    this.portfolioService.engine.ReclassifyAccomplishments(event);
  }
}
