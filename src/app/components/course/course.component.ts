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
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PropertyComponent } from '../property/property.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { StringExService } from '../../services/string-ex/string-ex.service';
import { ClassifierService } from '../../services/classifier/classifier.service';

import { Accomplishment } from '../../interfaces/cv/accomplishment';

/**
 * Course component
 * ~extends {@link PropertyComponent}
 */
@Component({
  standalone: false,
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent extends PropertyComponent {
  /** Property name type getter. */
  protected override get type(): string { return 'Accomplishment'; }

  /** Default date format getter. */
  protected override get defaultDateFormat() { return this.uiService.localizationService.dateFormatLong; }

  /** Whether property level is present or not. */
  private get levelPresent() { return this.propertyName.Level.length > 0; }

  /** Whether to show property level. */
  public get showLevel() {
    return this.levelPresent && this.classifierService.isCourse(this.propertyName);
  }

  /** The property level calculated. */
  public get level() { return this.showLevel ? this.propertyName.Level : ''; }

  /** Date Format clickable element. */
  @ViewChild('clickableDateFormat') clickableDateFormat?: ElementRef<HTMLSpanElement>;

  /**
   * Constructs the Course component.
   *
   * @param datePipe The data pipe injected dependency.
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param classifierService The classifier service injected dependency.
   */
  constructor(
    public readonly datePipe: DatePipe,
    public override readonly portfolioService: PortfolioService,
    public override readonly inputService: InputService,
    public override readonly uiService: UiService,
    public override readonly dataService: DataService,
    public override readonly excelDateFormatterService: ExcelDateFormatterService,
    public readonly classifierService: ClassifierService,
  ) {
    super(portfolioService, inputService, uiService, dataService, excelDateFormatterService);
  }

  /** Check if the started formatted date is the same as the completed formatted date. */
  sameFormattedDate(propertyName: Accomplishment) {
    return this.started(propertyName) === this.completed(propertyName);
  }

  /** Calculate and format started date. */
  started(propertyName: Accomplishment) {
    const started = 'Started';
    return this.formattedDate(this.getJsDateValueFromExcel(propertyName[started]));
  }

  /** Calculate and format completed date. */
  completed(propertyName: Accomplishment) {
    const completed = 'Completed';
    return this.formattedDate(this.getJsDateValueFromExcel(propertyName[completed]));
  }

  /** Calculate whether completed date is in the past. */
  expired(propertyName: Accomplishment) {
    const expiration = 'Expiration';
    return propertyName[expiration] && Date.now() > this.getJsDateValueFromExcel(propertyName[expiration]).valueOf();
  }

  /** Calculate expires label. */
  expiresLabel(propertyName: Accomplishment) {
    let label = this.uiService.uiText('Expires');
    if (this.expired(propertyName)) {
      label = StringExService.replaceAll(label, 'es', 'ed');
    }
    return label;
  }

  /** Format date. */
  private formattedDate(date: any) {
    return this.datePipe.transform(date, this.dateFormat);
  }

  /** Get accomplishment authority image uri delegate. */
  getAccomplishmentAuthorityImageUri(imageName: string) {
    return this.getSafeUri(this.dataService.imageDataService.getAccomplishmentAuthorityImageUri(imageName));
  }

  /** Get accomplishment certificate image uri delegate. */
  getAccomplishmentCertificateImageUri(imageName: string, full: boolean = false) {
    return this.getSafeUri(this.dataService.imageDataService.getAccomplishmentCertificateImageUri(imageName, full));
  }

  /** Get accomplishment certificate logo image uri delegate. */
  getAccomplishmentCertificateLogoImageUri(imageName: string, full: boolean = false) {
    return this.getSafeUri(this.dataService.imageDataService.getAccomplishmentCertificateLogoImageUri(imageName, full));
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }
}
