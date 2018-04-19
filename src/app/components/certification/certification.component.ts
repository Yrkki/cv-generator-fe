import { Component, OnInit } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent extends PropertyComponent {
  getAssetUri(imageName: string) {
    return this.portfolioComponent.getAssetUri(imageName);
  }
}
