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
import { Component, Input } from '@angular/core';
import { PropertyProviderComponent } from '../property-provider/property-provider.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { DataService } from '../../services/data/data.service';
import { Indexable } from '../../interfaces/indexable';

/**
 * Property component
 */
@Component({
  standalone: false,
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent extends PropertyProviderComponent {
  /** Injector propery name */
  #propertyName: Indexable = {};
  /** Injected propery name getter. */
  public get propertyName(): Indexable { return this.#propertyName; }
  /** Injected propery name setter. */
  @Input() public set propertyName(value: Indexable) { this.#propertyName = value; }

  /** Property name type getter. */
  protected get type(): string { return ''; }

  /** Default date format getter. */
  protected get defaultDateFormat() { return this.uiService.localizationService.dateFormatMiddle; }

  /** Date format getter. */
  public get dateFormat() {
    return this.portfolioService.persistenceService.getItem(this.dateFormatKey) ?? this.defaultDateFormat;
  }
  /** Date format setter. */
  public set dateFormat(value) {
    this.portfolioService.persistenceService.setItem(this.dateFormatKey, value.toString());
  }

  /** Property name type getter. */
  private get dateFormatKey() { return [this.type, 'date format'].join(' '); }

  /** Detail bullet symbol. */
  public get detailBullet() { return this.uiService.frequenciesDivider; }

  /** Detail indent. */
  public get detailIndent() { return '    '; }

  /** Description formatter. */
  public get description(): string[] {
    const description = this.propertyName.Description;
    if (description instanceof Array) {
      return description;
    } else {
      const stringDescription = description as string;
      return (stringDescription
        ? stringDescription.toString().split('\n')
        : [])
        .map((_) => _.replace(new RegExp('\\\\n', 'g'), '\n' + this.detailIndent));
    }
  }

  /**
   * Constructs the Property component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The UI service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    public override readonly portfolioService: PortfolioService,
    public readonly inputService: InputService,
    public override readonly uiService: UiService,
    public readonly dataService: DataService,
    public override readonly excelDateFormatterService: ExcelDateFormatterService,
  ) {
    super(portfolioService, uiService, excelDateFormatterService);
  }

  /** Rotate date format changer. */
  rotateDateFormat() {
    switch (this.dateFormat) {
      case this.uiService.localizationService.dateFormatShort: this.dateFormat = this.uiService.localizationService.dateFormatMiddle; break;
      case this.uiService.localizationService.dateFormatMiddle: this.dateFormat = this.uiService.localizationService.dateFormatFull; break;
      case this.uiService.localizationService.dateFormatFull: this.dateFormat = this.uiService.localizationService.dateFormatLong; break;
      case this.uiService.localizationService.dateFormatLong: this.dateFormat = this.uiService.localizationService.dateFormatShort; break;
      default: this.dateFormat = this.defaultDateFormat;
    }
  }
}
