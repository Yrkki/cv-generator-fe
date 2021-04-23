import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PropertyComponent } from '../property/property.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { Params } from '../../services/component-outlet-injector/params';
import { StringExService } from '../../services/string-ex/string-ex.service';

import { Accomplishment } from '../../classes/accomplishment/accomplishment';

/**
 * Course component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent extends PropertyComponent {
  /** Injected course getter. */
  public get propertyName(): Accomplishment { return super.propertyName as Accomplishment; }

  /** Injected course setter. */
  public set propertyName(value: Accomplishment) { super.propertyName = value; }

  /** Property name type getter. */
  protected get type(): string { return 'Accomplishment'; }

  /** Default date format getter. */
  protected get defaultDateFormat() { return this.uiService.localizationService.dateFormatLong; }

  /** UI delegate. */
  public get ui() { return this.portfolioService.model.portfolioModel.ui; }

  /** Whether property level is present or not. */
  private get levelPresent() { return this.propertyName.Level?.length > 0; }

  /** Whether to show property level. */
  public get showLevel() { return this.levelPresent && Accomplishment.isCourse(this.propertyName); }

  /** The property level calculated. */
  public get level() { return this.showLevel ? this.propertyName.Level + (this.levelPresent ? ',' : '') : ''; }

  /**
   * Constructs the Course component.
   * @param datePipe The data pipe injected dependency.
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public datePipe: DatePipe,
    public portfolioService: PortfolioService,
    public inputService: InputService,
    public uiService: UiService,
    public dataService: DataService,
    public excelDateFormatterService: ExcelDateFormatterService,
    public params?: Params) {
    super(portfolioService, inputService, uiService, dataService, excelDateFormatterService, params);
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
}
