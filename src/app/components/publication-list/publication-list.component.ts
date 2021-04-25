import { Component, Input } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { DataService } from '../../services/data/data.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { Params } from '../../services/component-outlet-injector/params';

/**
 * Publication list component
 * ~extends {@link PropertyComponent}
 */
@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent extends PropertyComponent {
  /** Index when part of a collection */
  @Input() i = 0;

  /** Inline date format */
  public get dateFormatInline() { return this.uiService.localizationService.dateFormatShort; }

  /** Property name type getter. */
  protected get type(): string { return 'Publication'; }

  /** Default date format getter. */
  protected get defaultDateFormat() { return this.uiService.localizationService.dateFormatShort; }

  /** Punctuation */
  public get punctuation() {
    return {
      space: ' ',
      comma: ',',
      colon: ':',
      semicolon: ';',
      hyphen: '-',
      'en-dash': '–',
      'em-dash': '—',
      'quote opening': '\'',
      'quote closing': '\'',
      'quote double opening': '"',
      'quote double closing': '"',
      dot: '.',
      'bracket round opening': '(',
      'bracket round closing': ')',
      'bracket curly opening': '{',
      'bracket curlyclosing': '}',
      'bracket square opening': '[',
      'bracket square closing': ']',
      'bracket angle opening': '⟨',
      'bracket angle closing': '⟩',
    };
  }

  /**
   * Constructs the Publication list component.
   *
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

  /** Get accomplishment publication logo image uri delegate. */
  getAccomplishmentPublicationLogoImageUri(imageName: string, full: boolean = false) {
    return this.getSafeUri(this.dataService.imageDataService.getAccomplishmentPublicationLogoImageUri(imageName, full));
  }
}
