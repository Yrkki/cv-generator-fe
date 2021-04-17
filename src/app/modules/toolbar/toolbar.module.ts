import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToolbarRoutingModule } from './toolbar-routing.module';

import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { ToggleModule } from '../toggle/toggle.module';
import { MultiToggleModule } from '../multi-toggle/multi-toggle.module';
import { TruncatorModule } from '../truncator/truncator.module';

/** Toolbar module. */
@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToolbarRoutingModule,
    ToggleModule,
    MultiToggleModule,
    TruncatorModule,
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
