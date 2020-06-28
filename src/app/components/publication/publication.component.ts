import { Component } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

/**
 * Publication component
 */
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent extends PropertyComponent {
  /** Date format */
  public get dateFormat() { return this.portfolioComponent.dateFormatShort; }

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
    return this.getSafeUri(this.dataService.getAccomplishmentPublicationLogoImageUri(imageName, full));
  }
}
