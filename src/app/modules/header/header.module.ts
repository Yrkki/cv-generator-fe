import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderRoutingModule } from './header-routing.module';

import { HeaderComponent } from '../../components/header/header.component';
import { ToggleModule } from '../toggle/toggle.module';

/** Header module. */
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    HeaderRoutingModule,
    ToggleModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }