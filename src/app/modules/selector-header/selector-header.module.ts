import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectorHeaderRoutingModule } from './selector-header-routing.module';
import { HeaderModule } from '../header/header.module';

import { SelectorHeaderComponent } from '../../components/selector-header/selector-header.component';

/** Selector header module. */
@NgModule({
  declarations: [SelectorHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    SelectorHeaderRoutingModule,
    HeaderModule,
  ],
  exports: [SelectorHeaderComponent]
})
export class SelectorHeaderModule { }
