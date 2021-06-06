import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchProviderRoutingModule } from './search-provider-routing.module';

import { SearchProviderComponent } from '../../components/search-provider/search-provider.component';

/** SearchProvider module. */
@NgModule({
  declarations: [SearchProviderComponent],
  imports: [
    CommonModule,
    FormsModule,
    SearchProviderRoutingModule,
  ],
  exports: [SearchProviderComponent]
})
export class SearchProviderModule { }
