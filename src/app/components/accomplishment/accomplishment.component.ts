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
import { Component, Injector, AfterViewInit, ViewChildren, QueryList, Inject, Input, ViewChild, ElementRef } from '@angular/core';

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

import { CourseIndexComponent } from '../course-index/course-index.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { CourseComponent } from '../course/course.component';
import { LanguageComponent } from '../language/language.component';

import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';
import { Indexable } from '../../interfaces/indexable';
import { HeaderComponent } from '../header/header.component';

import { Accomplishment } from '../../interfaces/cv/accomplishment';

/**
 * Accomplishment component.
 * ~extends {@link AccomplishmentProviderComponent}
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-accomplishment',
  templateUrl: './accomplishment.component.html',
  styleUrls: ['./accomplishment.component.scss']
})
export class AccomplishmentComponent extends AccomplishmentsProviderComponent implements AfterViewInit {
  /** The component accomplishment type */
  @Input() public accomplishmentType!: string;

  // /** Get JSON. */
  // public get JSON() { return JSON; }

  /** The component filtered accomplishments */
  @Input() public filtered!: Accomplishment[];

  /** Header component. */
  @ViewChildren(HeaderComponent) headerComponents?: QueryList<HeaderComponent>;

  /** Classifier Kind clickable element. */
  @ViewChild('classifierKind') classifierKind?: ElementRef<HTMLElement>;

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** Course index component ComponentOutlet hook. */
  public get CourseIndexComponent() { return CourseIndexComponent; }
  /** Course list component ComponentOutlet hook. */
  public get CourseListComponent() { return CourseListComponent; }
  /** Course component ComponentOutlet hook. */
  public get CourseComponent() { return CourseComponent; }
  /** Language component ComponentOutlet hook. */
  public get LanguageComponent() { return LanguageComponent; }

  /** The injector cache holder */
  private injectorCache = {};
  /** Injector getter delegate. */
  getInjector(propertyName: Indexable, i?: number): Injector { return this.componentOutletInjectorService.getInjector(propertyName, i); }

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
   * @param injector The injector injected dependency.
   * @param componentOutletInjectorService The component outlet injector service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly entitiesService: EntitiesService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Accomplishments)) public readonly sorterService: SorterService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Cv)) public readonly truncatorService: TruncatorService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    protected readonly persistenceService: PersistenceService,
    private readonly injector: Injector,
    private readonly componentOutletInjectorService: ComponentOutletInjectorService
  ) {
    super(portfolioService, entitiesService, inputService, uiService, persistenceService);
    componentOutletInjectorService.init(injector, this.injectorCache);
  }

  /** AfterViewInit handler */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  // eslint-disable-next-line max-lines-per-function
  Initialize() {
    [
      'Certifications',
      'Certifications Index',
      'Certifications List',
      'Languages',
      'Languages Index',
      'Languages List',
      'Languages Chart',
      'Courses',
      'Courses Index',
      'Courses List',
      'Organizations',
      'Organizations Index',
      'Organizations List',
      'Honors and Awards',
      'Honors and Awards Index',
      'Honors and Awards List',
      'Volunteering',
      'Volunteering Index',
      'Volunteering List',
      'Interests and Hobbies',
      'Interests and Hobbies Index',
      'Interests and Hobbies List',
      'Vacation',
      'Vacation Index',
      'Vacation List'
    ].forEach((_) => this.persistenceService.restoreToggle(document, _));
  }

  // /**
  //  * Rotate classifier kind changer.
  //  *
  //  * @param event The initiating click event.
  //  */
  // public onClick(event: MouseEvent) {
  //   const target = event.target as HTMLElement;
  //   if (
  //     target.classList.contains('changeOntologyStructure')
  //   ) {
  //     // this.portfolioService.engine.model.portfolioModel.classifierService.changeOntologyStructure(event);
  //   } else if (
  //     target.classList.contains('classifier')
  //     || target.classList.contains('clickableClassifierKind')
  //     || target.parentElement?.classList.contains('clickableClassifierKind')
  //     // || target.parentElement?.parentElement?.classList.contains('clickableClassifierKind')
  //   ) {
  //   }
  // }

  /**
   * Rotate classifier kind changer.
   *
   * @param event The initiating click event.
   */
  // eslint-disable-next-line complexity
  // eslint-disable-next-line max-lines-per-function
  public rotateClassifierKind(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // const currentTarget = event.currentTarget as HTMLElement;
    // // console.log(`AccomplishmentComponent: rotateClassifierKind: ${(event.target as HTMLElement)?.innerHTML.trim()}`);
    // console.log(`AccomplishmentComponent: rotateClassifierKind: ${target.innerHTML.trim()}, `
    // + `this.classifierKind: ${this.portfolioService.engine.model.portfolioModel.classifierService.classifierKind}, `
    // + `currentTarget.classList: ${currentTarget.classList}, `
    // + `target.classList: ${target.classList}, target.className: ${target.className}`);

    if (!(
      target.classList.contains('classifier')
      || target.classList.contains('clickableClassifierKind')
      || target.parentElement!.classList.contains('clickableClassifierKind')
      || target.parentElement!.parentElement!.classList.contains('clickableClassifierKind')
    )) { return; }
    // this.portfolioService.engine.model.portfolioModel.classifierService.rotateClassifierKind(event);
    // const accomplishments = this.portfolioService.engine.model.portfolioModel.filtered.Accomplishments;
    // if (accomplishments) {
    //   this.portfolioService.engine.model.portfolioModel.cv.Courses = accomplishments;
    //   this.portfolioService.engine.model.portfolioModel.filtered.Accomplishments = accomplishments;
    // }
    // this.portfolioService.engine.model.portfolioModel.classifierService.ontologyService.ontologyAdjusterService.adjustOntology();

    // this.portfolioService.engine.filterService.searchTokenChangeHandler();

    // // this.portfolioService.engine.model.portfolioModel.classifierService.rotateClassifierKind(event);
    // this.portfolioService.engine.model.portfolioModel.classifierService.next(event);
    // this.portfolioService.engine.model.portfolioModel.ReclassifyAccomplishments();
    // this.portfolioService.engine.filterService.searchTokenChangeHandler();
    this.portfolioService.engine.ReclassifyAccomplishments(event);
  }
}
