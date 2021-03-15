import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TruncatorRoutingModule } from './truncator-routing.module';

import { TruncatorComponent } from '../../components/truncator/truncator.component';

/** Truncator module. */
@NgModule({
  declarations: [TruncatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    TruncatorRoutingModule
  ],
  exports: [TruncatorComponent]
})
export class TruncatorModule { }
