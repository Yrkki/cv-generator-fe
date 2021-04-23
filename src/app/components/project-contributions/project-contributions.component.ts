import { Component, Inject } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

import { EngineService } from '../../services/engine/engine.service';
import { SorterService } from '../../services/sorter/sorter.service';
import { SorterServiceFactory } from '../../factories/sorter/sorter.service.factory';
import { TruncatorService } from '../../services/truncator/truncator.service';
import { TruncatorServiceFactory } from '../../factories/truncator/truncator.service.factory';

import { UiService } from '../../services/ui/ui.service';
import { StringExService } from '../../services/string-ex/string-ex.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';

import { SorterKind } from '../../enums/sorter-kind.enum';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { Project } from '../../interfaces/project/project';

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
  public get dateFormat() { return this.uiService.localizationService.dateFormatShort; }

  /** Main component name delegate. */
  public get componentName() { return this.uiService.componentName; }

  /** Entities delegate. */
  public get entities() { return this.portfolioService.model.portfolioModel.entities; }
  /** UI delegate. */
  public get ui() { return this.portfolioService.model.portfolioModel.ui; }
  /** Filtered delegate. */
  public get filtered() { return this.portfolioService.model.portfolioModel.filtered; }

  /**
   * Constructs the Project component.
   * @param portfolioService The portfolio service injected dependency.
   * @param engine The engine service injected dependency.
   * @param sorterService The sorter service injected dependency.
   * @param truncatorService The truncator service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    private readonly engine: EngineService,
    @Inject(SorterServiceFactory.tokenDescription(SorterKind.Projects)) public readonly sorterService: SorterService,
    @Inject(TruncatorServiceFactory.tokenDescription(TruncatorKind.Pp)) public readonly truncatorService: TruncatorService,
    private readonly uiService: UiService,
    private readonly excelDateFormatterService: ExcelDateFormatterService) {
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

  /** Frequency getter. */
  public frequency(project: Project) {
    return this.engine.filterService.projectFrequency(project);
  }

  /** Frequency style delegate. */
  public getFrequencyStyle(frequency: any[]) {
    return this.uiService.getFrequencyStyle(frequency, this.truncatorService.TagCloudEmphasis);
  }
}
