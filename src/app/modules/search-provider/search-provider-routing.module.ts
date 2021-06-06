import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchProviderComponent } from '../../components/search-provider/search-provider.component';
const routes: Routes = [{ path: '', component: SearchProviderComponent }
];

/**
 * SearchProvider routing module.
 * Separates routing concerns within the modules tier as delegated to by the original module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchProviderRoutingModule { }
