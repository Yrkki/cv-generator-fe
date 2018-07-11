import { Component, OnInit } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

/**
 * Education component
 */
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent extends PropertyComponent {
  /** Date format */
  public get dateFormat() { return this.portfolioComponent.dateFormatShorter; }

  /**
   * Education detail.
   * @param propertyName The property name.
   */
  schoolDetail(propertyName) {
    return [
      propertyName['Degree'],
      propertyName['Field'],
      propertyName['Honors']]
      .filter(_ => _ !== undefined && _ !== null && _ !== '')
      .join(', ');
  }
}
