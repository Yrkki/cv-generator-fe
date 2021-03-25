import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from '../../components/search/search.component';

import { ToggleModule } from '../toggle/toggle.module';

/** Search module. */
@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    ToggleModule,
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
