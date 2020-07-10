import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PropertyComponent } from '../property/property.component';

import { PortfolioComponent } from '../portfolio/portfolio.component';
import { DataService } from '../../services/data/data.service';
import { Params } from '../../services/component-outlet-injector/params';

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
  /** UI delegate. */
  public get ui() { return this.portfolioComponent.ui; }

  /**
   * Constructs the Course component.
   * @param datePipe The data pipe injected dependency.
   * @param portfolioComponent The common portfolio component injected dependency.
   * @param dataService The data service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public datePipe: DatePipe,
    public portfolioComponent: PortfolioComponent,
    public dataService: DataService,
    public params?: Params) {
    super(portfolioComponent, dataService, params);
  }

  /** Check if the started formatted date is the same as the completed formatted date. */
  sameFormattedDate(propertyName) {
    return this.started(propertyName) === this.completed(propertyName);
  }

  /** Calculate and format started date. */
  started(propertyName) {
    const started = 'Started';
    return this.formattedDate(this.getJsDateValueFromExcel(propertyName[started]));
  }

  /** Calculate and format completed date. */
  completed(propertyName) {
    const completed = 'Completed';
    return this.formattedDate(this.getJsDateValueFromExcel(propertyName[completed]));
  }

  /** Format date. */
  private formattedDate(date) {
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
