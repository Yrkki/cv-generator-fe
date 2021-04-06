import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationRoutingModule } from './publication-routing.module';
import { PublicationIndexModule } from '../publication-index/publication-index.module';
import { PublicationListModule } from '../publication-list/publication-list.module';
import { SorterModule } from '../sorter/sorter.module';
import { HeaderTitleModule } from '../header-title/header-title.module';

import { PublicationComponent } from '../../components/publication/publication.component';

/** Publication module. */
@NgModule({
  declarations: [PublicationComponent],
  imports: [
    CommonModule,
    PublicationRoutingModule,
    PublicationIndexModule,
    PublicationListModule,
    SorterModule,
    HeaderTitleModule,
  ],
  exports: [PublicationComponent]
})
export class PublicationModule { }
