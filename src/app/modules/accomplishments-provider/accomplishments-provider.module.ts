import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccomplishmentsProviderRoutingModule } from './accomplishments-provider-routing.module';

import { AccomplishmentsProviderComponent } from '../../components/accomplishments-provider/accomplishments-provider.component';

/** AccomplishmentsProvider module. */
@NgModule({
  declarations: [AccomplishmentsProviderComponent],
  imports: [
    CommonModule,
    AccomplishmentsProviderRoutingModule,
  ],
  exports: [AccomplishmentsProviderComponent]
})
export class AccomplishmentsProviderModule { }
