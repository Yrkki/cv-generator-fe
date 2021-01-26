import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderRoutingModule } from './header-routing.module';

import { HeaderComponent } from '../../components/header/header.component';
import { ExpandToggleModule } from '../expand-toggle/expand-toggle.module';

/** Header module. */
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    HeaderRoutingModule,
    ExpandToggleModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
