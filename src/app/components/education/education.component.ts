import { Component } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { Education } from '../../interfaces/cv/education';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { Params } from '../../services/component-outlet-injector/params';

/**
 * Education component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent extends PropertyComponent {
  /** Injected education getter. */
  public get propertyName(): Education { return super.propertyName as Education; }

  /** Injected education setter. */
  public set propertyName(value: Education) { super.propertyName = value; }

  /** Honors education property. */
  public get honors() { return this.propertyName.Honors; }

  /** Property component ComponentOutlet hook. */
  public PropertyComponent = PropertyComponent;

  /** Date format */
  public get dateFormat() { return this.uiService.dateFormatShort; }

  /**
   * Constructs the Education component.
   * @param portfolioService The portfolio service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public uiService: UiService,
    public dataService: DataService,
    public excelDateFormatterService: ExcelDateFormatterService,
    public params?: Params) {
    super(portfolioService, uiService, dataService, excelDateFormatterService, params);
  }

  /** Education subject. */
  get schoolSubject() {
    const field = 'Field';
    return [
      this.propertyName[field],
      this.schoolDetail
    ]
      .filter(_ => _ !== undefined && _ !== null && _ !== '')
      .join(': ');
  }

  /** Education detail. */
  get schoolDetail() {
    const degree = 'Degree';
    const major = 'Major';
    return [
      this.propertyName[degree],
      this.propertyName[major]
    ]
      .filter(_ => _ !== undefined && _ !== null && _ !== '')
      .join(' in ');
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }
}
