import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyProviderComponent } from '../../components/property-provider/property-provider.component';
const routes: Routes = [  { path: '', component: PropertyProviderComponent }
];

/**
 * PropertyProvider routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyProviderRoutingModule { }
