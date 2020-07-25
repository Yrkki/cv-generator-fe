import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PropertyComponent } from '../property/property.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { Params } from '../../services/component-outlet-injector/params';

import { Course } from '../../interfaces/cv/course';

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
  public get propertyName(): Course { return super.propertyName as Course; }

  /** Injected course setter. */
  public set propertyName(value: Course) { super.propertyName = value; }

  /** UI delegate. */
  public get ui() { return this.portfolioService.ui; }

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
    super(portfolioService, uiService, dataService, excelDateFormatterService, params);
  }

  /** Check if the started formatted date is the same as the completed formatted date. */
  sameFormattedDate(propertyName: Course) {
    return this.started(propertyName) === this.completed(propertyName);
  }

  /** Calculate and format started date. */
  started(propertyName: Course) {
    const started = 'Started';
    return this.formattedDate(this.getJsDateValueFromExcel(propertyName[started]));
  }

  /** Calculate and format completed date. */
  completed(propertyName: Course) {
    const completed = 'Completed';
    return this.formattedDate(this.getJsDateValueFromExcel(propertyName[completed]));
  }

  /** Format date. */
  private formattedDate(date: any) {
    return this.datePipe.transform(date, this.dateFormat);
  }

  /** Get accomplishment authority image uri delegate. */
  getAccomplishmentAuthorityImageUri(imageName: string) {
    return this.getSafeUri(this.dataService.getAccomplishmentAuthorityImageUri(imageName));
  }

  /** Get accomplishment certificate image uri delegate. */
  getAccomplishmentCertificateImageUri(imageName: string, full: boolean = false) {
    return this.getSafeUri(this.dataService.getAccomplishmentCertificateImageUri(imageName, full));
  }

  /** Get accomplishment certificate logo image uri delegate. */
  getAccomplishmentCertificateLogoImageUri(imageName: string, full: boolean = false) {
    return this.getSafeUri(this.dataService.getAccomplishmentCertificateLogoImageUri(imageName, full));
  }
}
