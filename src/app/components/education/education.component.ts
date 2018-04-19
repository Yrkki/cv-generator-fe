import { Component, OnInit } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent extends PropertyComponent {
  schoolDetail(propertyName) {
    return [
      propertyName['Degree'],
      propertyName['Field'],
      propertyName['Grade'],
      propertyName['Description']]
      .filter(_ => _ !== undefined && _ !== '')
      .join(', ');
  }
}
