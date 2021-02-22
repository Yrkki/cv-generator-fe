import { Component, Input } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { Params } from '../../services/component-outlet-injector/params';

import { SorterComponent } from '../sorter/sorter.component';
import { Project } from '../../interfaces/project/project';

/**
 * Project index component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-project-index',
  templateUrl: './project-index.component.html',
  styleUrls: ['./project-index.component.scss']
})
export class ProjectIndexComponent extends PropertyComponent {
  /** Index when part of a collection */
  @Input() i = 0;

  /** Sorter. */
  @Input() sorter!: SorterComponent;

  /** Frequencies divider object delegate. */
  public get frequenciesDivider() { return this.uiService.frequenciesDivider; }

  /** Main component name delegate. */
  public get componentName() { return this.uiService.componentName; }

  /** Filtered delegate. */
  public get filtered() { return this.portfolioService.filtered; }

  /**
   * Constructs the Project index component.
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataService The data service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param params The inherited injector params injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public inputService: InputService,
    public uiService: UiService,
    public dataService: DataService,
    public excelDateFormatterService: ExcelDateFormatterService,
    public params?: Params) {
    super(portfolioService, inputService, uiService, dataService, excelDateFormatterService, params);
    if (this.params !== undefined) {
      this.i = this.params.i;
    }
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }

  /** Frequency getter. */
  public frequency(project: Project) {
    return this.portfolioService.projectFrequency(project);
  }

  /** Frequency style delegate. */
  public getFrequencyStyle(frequency: any[]) {
    const tagCloudEmphasis = this.portfolioService.controller(this.entities.Index?.key).tagCloudEmphasis;
    return this.uiService.getFrequencyStyle(frequency, tagCloudEmphasis);
  }

  /** Remaining collection. */
  public remaining(collection: any[]): any[] {
    return this.portfolioService.remaining(collection, undefined, this.entities.Index?.key);
  }
}
