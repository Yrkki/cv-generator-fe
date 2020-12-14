import { Component } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

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
  /** Inline date format */
  public get dateFormatInline() { return this.uiService.dateFormatShort; }

  /** Property name type getter. */
  protected get type(): string { return 'Publication'; }

  /** Default date format getter. */
  protected get defaultDateFormat() { return this.uiService.dateFormatShort; }

  /** Punctuation */
  public get punctuation() {
    return {
      'space': ' ',
      'comma': ',',
      'colon': ':',
      'semicolon': ';',
      'hyphen': '-',
      'en-dash': '–',
      'em-dash': '—',
      'quote opening': '\'',
      'quote closing': '\'',
      'quote double opening': '"',
      'quote double closing': '"',
      'dot': '.',
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

  /** Get accomplishment publication logo image uri delegate. */
  getAccomplishmentPublicationLogoImageUri(imageName: string, full: boolean = false) {
    return this.getSafeUri(this.dataService.imageDataService.getAccomplishmentPublicationLogoImageUri(imageName, full));
  }
}
