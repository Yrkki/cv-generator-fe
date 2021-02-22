import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ThemeChangerRoutingModule } from './theme-changer-routing.module';

import { ThemeChangerComponent } from '../../components/theme-changer/theme-changer.component';

/** ThemeChanger module. */
@NgModule({
  declarations: [ThemeChangerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ThemeChangerRoutingModule
  ],
  exports: [ThemeChangerComponent]
})
export class ThemeChangerModule { }
