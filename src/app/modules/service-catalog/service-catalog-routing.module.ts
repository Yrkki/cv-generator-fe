import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceCatalogComponent } from '../../components/service-catalog/service-catalog.component';
const routes: Routes = [
  { path: '', component: ServiceCatalogComponent },
];

/**
 * ServiceCatalog routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceCatalogRoutingModule { }
