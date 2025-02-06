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
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

import { EngineService } from '../../services/engine/engine.service';
import { TruncatorService } from '../../services/truncator/truncator.service';

import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

import { Accomplishment } from '../../interfaces/cv/accomplishment';
import { ClassifierService } from '../../services/classifier/classifier.service';

/**
 * Index component
 * ~extends {@link PropertyComponent}
 */
@Component({
  standalone: false,
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends PropertyComponent {
  /** Frequency override. */
  @Input() public frequencyOverride: any = void 0;

  /** The truncator service injected dependency. */
  @Input() public truncatorService!: TruncatorService;

  /** A clickable element. */
  @ViewChild('clickable') clickable?: ElementRef<HTMLElement>;

  /** The key. */
  public get key() {
    return this.classifierService.isPublication(this.propertyName) ? 'Title'
      : this.classifierService.isLanguage(this.propertyName as Accomplishment) ? 'Language'
        : 'Name';
  }

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** Update search token delegate. */
  public updateSearchToken(event: MouseEvent) { this.engine.searchService.updateSearchToken(event); }

  /**
   * Constructs the index component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param classifierService The classifier service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    public override readonly portfolioService: PortfolioService,
    public readonly engine: EngineService,
    public readonly classifierService: ClassifierService,
    public override readonly inputService: InputService,
    public override readonly uiService: UiService,
    public override readonly dataService: DataService,
    public override readonly excelDateFormatterService: ExcelDateFormatterService,
  ) {
    super(portfolioService, inputService, uiService, dataService, excelDateFormatterService);
  }

  /** Frequency getter. Match frequency for the template to the precalculated cache. */
  public get frequency() {
    return this.frequencyOverride ?? this.portfolioService.getFrequency(this.frequenciesCacheKey, this.propertyName[this.key]);
  }

  /** Frequency cache key getter. */
  public get frequenciesCacheKey() {
    const frequenciesCacheKey = [
      { predicate: this.classifierService.isLanguage, cacheKey: 'Language' },
      { predicate: this.classifierService.isCertification, cacheKey: 'Certification' },
      { predicate: this.classifierService.isOrganization, cacheKey: 'Organization' },
      { predicate: this.classifierService.isHonorAndAward, cacheKey: 'Honor and Award' },
      { predicate: this.classifierService.isVolunteering, cacheKey: 'Volunteering' },
      { predicate: this.classifierService.isInterestAndHobby, cacheKey: 'Interest and Hobby' },
      { predicate: this.classifierService.isVacation, cacheKey: 'Vacation' },
      // { predicate: this.classifierService.isCourse, cacheKey: 'Name' },

      { predicate: this.classifierService.isPublication, cacheKey: 'Title' },
    ].find((_) => _.predicate.apply(this.classifierService, [this.propertyName]))?.cacheKey ?? this.key;

    return frequenciesCacheKey;
  }

  /** Frequency style delegate. */
  public getFrequencyStyle(frequency: any[]) {
    return this.uiService.getFrequencyStyle(frequency, this.truncatorService.TagCloudEmphasis);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }
}
