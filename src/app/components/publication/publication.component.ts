import { Component, OnInit } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent extends PropertyComponent {
  getAccomplishmentPublicationLogoImageUri(imageName: string) {
    return this.getSafeUri(this.dataService.getAccomplishmentPublicationLogoImageUri(imageName));
  }
}
