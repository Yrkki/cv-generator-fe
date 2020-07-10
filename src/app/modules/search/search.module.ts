import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from '../../components/search/search.component';

/** Search module. */
@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
