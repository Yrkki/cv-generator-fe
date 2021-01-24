import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExpandToggleRoutingModule } from './expand-toggle-routing.module';

import { ExpandToggleComponent } from '../../components/expand-toggle/expand-toggle.component';

/** ExpandToggle module. */
@NgModule({
  declarations: [ExpandToggleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ExpandToggleRoutingModule,
  ],
  exports: [ExpandToggleComponent]
})
export class ExpandToggleModule { }
