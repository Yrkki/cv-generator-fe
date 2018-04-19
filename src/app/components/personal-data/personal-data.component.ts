import { Component, OnInit } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent extends PropertyComponent {
}
