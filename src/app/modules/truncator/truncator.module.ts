import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TruncatorRoutingModule } from './truncator-routing.module';

import { TruncatorComponent } from '../../components/truncator/truncator.component';

import { ToggleModule } from '../toggle/toggle.module';

/** Truncator module. */
@NgModule({
  declarations: [TruncatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    TruncatorRoutingModule,
    ToggleModule,
  ],
  exports: [TruncatorComponent]
})
export class TruncatorModule { }
