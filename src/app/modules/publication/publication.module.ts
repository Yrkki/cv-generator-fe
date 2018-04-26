import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PublicationComponent } from '../../components/publication/publication.component';

export const ROUTES: Routes = [{ path: 'Publication', component: PublicationComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [PublicationComponent]
})
export class PublicationModule { }
