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
  protected get dateFormat() { return 'yyyy'; }

  /** Get accomplishment publication logo image uri delegate. */
  getAccomplishmentPublicationLogoImageUri(imageName: string, full: boolean = false) {
    return this.getSafeUri(this.dataService.getAccomplishmentPublicationLogoImageUri(imageName, full));
  }
}
