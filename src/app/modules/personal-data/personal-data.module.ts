import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalDataRoutingModule } from './personal-data-routing.module';

import { PersonalDataComponent } from '../../components/personal-data/personal-data.component';

/** PersonalData module. */
@NgModule({
  declarations: [PersonalDataComponent],
  imports: [
    CommonModule,
    PersonalDataRoutingModule,
  ],
  exports: [PersonalDataComponent]
})
export class PersonalDataModule { }
