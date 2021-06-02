import { Component } from '@angular/core';
import { UiService } from '../../services/ui/ui.service';
import { ExcelDateFormatterService } from '../../services/excel-date-formatter/excel-date-formatter.service';
import { ModelModel } from '../../model/model/model.model';

/**
 * PropertyProvider component
 */
@Component({
  selector: 'app-property-provider',
  templateUrl: './property-provider.component.html',
  styleUrls: ['./property-provider.component.scss']
})
export class PropertyProviderComponent {
  /** Entities delegate. */
  public get entities() { return this.model.portfolioModel.entities; }

  /** UI delegate. */
  public get ui() { return this.model.portfolioModel.ui; }

  /**
   * Constructs the PropertyProvider component.
   *
   * @param uiService The UI service injected dependency.
   * @param excelDateFormatterService The Excel date formatter service injected dependency.
   * @param model The model injected dependency.
   */
  constructor(
    public readonly uiService: UiService,
    public readonly excelDateFormatterService: ExcelDateFormatterService,
    public readonly model: ModelModel,
  ) {
  }

  /** Get background logoimage uri delegate. */
  getBackgroundLogoImageUri(imageName: string) {
    return this.uiService.imageService.getBackgroundLogoImageUri(imageName);
  }

  /** Get safe uri delegate. */
  getSafeUri(url: string) {
    return this.uiService.imageService.getSafeUri(url);
  }

  /** Get JS date value from Excel delegate. */
  getJsDateValueFromExcel(excelDate: any) {
    return this.excelDateFormatterService.getJsDateValueFromExcel(excelDate);
  }

  /** Link label delegate. */
  linkLabel(key: string | undefined): string {
    return this.uiService.linkLabel(key);
  }
}
