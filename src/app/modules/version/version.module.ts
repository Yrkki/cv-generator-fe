import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VersionRoutingModule } from './version-routing.module';

import { VersionComponent } from '../../components/version/version.component';
import { ExpandToggleModule } from '../expand-toggle/expand-toggle.module';
import { HeaderModule } from '../header/header.module';
import { BadgeModule } from '../badge/badge.module';

/** Version module. */
@NgModule({
  declarations: [VersionComponent],
  imports: [
    CommonModule,
    FormsModule,
    VersionRoutingModule,
    ExpandToggleModule,
    HeaderModule,
    BadgeModule,
  ],
  exports: [VersionComponent]
})
export class VersionModule { }
