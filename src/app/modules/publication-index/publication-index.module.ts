import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PublicationIndexComponent } from '../../components/publication-index/publication-index.component';
import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

export const ROUTES: Routes = [{ path: 'PublicationIndex', component: PublicationIndexComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [PublicationIndexComponent],
  providers: [PortfolioComponent]
})
export class PublicationIndexModule { }
