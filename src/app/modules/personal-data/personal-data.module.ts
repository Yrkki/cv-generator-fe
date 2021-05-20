import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalDataRoutingModule } from './personal-data-routing.module';

import { PersonalDataComponent } from '../../components/personal-data/personal-data.component';

import { SelectorHeaderModule } from '../selector-header/selector-header.module';
import { SelectorModule } from '../selector/selector.module';

/** PersonalData module. */
@NgModule({
  declarations: [PersonalDataComponent],
  imports: [
    CommonModule,
    PersonalDataRoutingModule,
    SelectorHeaderModule,
    SelectorModule,
  ],
  exports: [PersonalDataComponent]
})
export class PersonalDataModule { }
