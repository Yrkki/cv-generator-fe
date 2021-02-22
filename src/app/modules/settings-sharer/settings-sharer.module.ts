import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SettingsSharerRoutingModule } from './settings-sharer-routing.module';

import { SettingsSharerComponent } from '../../components/settings-sharer/settings-sharer.component';

/** SettingsSharer module. */
@NgModule({
  declarations: [SettingsSharerComponent],
  imports: [
    CommonModule,
    FormsModule,
    SettingsSharerRoutingModule
  ],
  exports: [SettingsSharerComponent]
})
export class SettingsSharerModule { }
