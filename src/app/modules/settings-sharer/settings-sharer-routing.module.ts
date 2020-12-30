import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsSharerComponent } from '../../components/settings-sharer/settings-sharer.component';
const routes: Routes = [  { path: '', component: SettingsSharerComponent }
];

/**
 * SettingsSharer routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsSharerRoutingModule { }
