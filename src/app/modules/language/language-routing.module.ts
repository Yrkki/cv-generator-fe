import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanguageComponent } from '../../components/language/language.component';
const routes: Routes = [  { path: '', component: LanguageComponent }
];

/**
 * Language routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageRoutingModule { }
