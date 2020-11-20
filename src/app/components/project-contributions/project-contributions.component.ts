import { Component } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { StringExService } from '../../services/string-ex/string-ex.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

/**
 * Project contributions component
 */
@Component({
  selector: 'app-project-contributions',
  templateUrl: './project-contributions.component.html',
  styleUrls: ['./project-contributions.component.scss']
})
export class ProjectContributionsComponent {
  /** Date format */
  public get dateFormat() { return this.uiService.dateFormatShort; }

  /** Main component name delegate. */
  public get componentName() { return this.uiService.componentName; }

  /** Entities delegate. */
  public get entities() { return this.portfolioService.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioService.ui; }
  /** Filtered delegate. */
  public get filtered() { return this.portfolioService.filtered; }

  /**
   * Constructs the Project component.
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    private inputService: InputService,
    private uiService: UiService,
    private excelDateFormatterService: ExcelDateFormatterService) {
  }

  /** One person team project indicator delegate. */
  public getProjectIsOnePersonTeam(project: any): boolean {
    return this.portfolioService.getProjectIsOnePersonTeam(project);
  }

  /** Get decrypted project period delegate. */
  public getDecryptedProjectPeriod(project: any): string {
    return this.portfolioService.getDecryptedProjectPeriod(project);
  }

  /** Get JS date value from Excel delegate. */
  public getJsDateValueFromExcel(excelDate: any) {
    return this.excelDateFormatterService.getJsDateValueFromExcel(excelDate);
  }

  /** To title case delegate. */
  public toTitleCase(str: string | undefined) { return StringExService.toTitleCase(str); }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }
}
