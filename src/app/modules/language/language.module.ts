import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LanguageComponent } from '../../components/language/language.component';

export const ROUTES: Routes = [{ path: 'Language', component: LanguageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [LanguageComponent]
})
export class LanguageModule { }
