import { Component, OnInit } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent extends PropertyComponent {
  getAccomplishmentCertificateImageUri(imageName: string) {
    return this.getSafeUri(this.dataService.getAccomplishmentCertificateImageUri(imageName));
  }

  getAccomplishmentLogoImageUri(imageName: string) {
    return this.getSafeUri(this.dataService.getAccomplishmentLogoImageUri(imageName));
  }
}
