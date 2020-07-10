import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpectrumComponent } from '../../components/spectrum/spectrum.component';
const routes: Routes = [  { path: '', component: SpectrumComponent }
];

/**
 * Spectrum routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpectrumRoutingModule { }
