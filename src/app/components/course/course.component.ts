import { Component } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

/**
 * Course component
 */
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent extends PropertyComponent {
  /** Get accomplishment authority image uri delegate. */
  getAccomplishmentAuthorityImageUri(imageName: string) {
    return this.getSafeUri(this.dataService.getAccomplishmentAuthorityImageUri(imageName));
  }

  /** Get accomplishment certificate image uri delegate. */
  getAccomplishmentCertificateImageUri(imageName: string, full: boolean = false) {
    return this.getSafeUri(this.dataService.getAccomplishmentCertificateImageUri(imageName, full));
  }

  /** Get accomplishment certificate logo image uri delegate. */
  getAccomplishmentCertificateLogoImageUri(imageName: string, full: boolean = false) {
    return this.getSafeUri(this.dataService.getAccomplishmentCertificateLogoImageUri(imageName, full));
  }
}
