import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageRoutingModule } from './language-routing.module';

import { LanguageComponent } from '../../components/language/language.component';

/** Language module. */
@NgModule({
  declarations: [LanguageComponent],
  imports: [
    CommonModule,
    LanguageRoutingModule,
  ],
  exports: [LanguageComponent]
})
export class LanguageModule { }
