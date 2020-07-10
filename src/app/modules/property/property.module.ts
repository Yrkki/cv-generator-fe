import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRoutingModule } from './property-routing.module';

import { PropertyComponent } from '../../components/property/property.component';

/** Property module. */
@NgModule({
  declarations: [PropertyComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
  ],
  exports: [PropertyComponent]
})
export class PropertyModule { }
