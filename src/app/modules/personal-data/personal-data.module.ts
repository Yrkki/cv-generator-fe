import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PersonalDataComponent } from '../../components/personal-data/personal-data.component';

export const ROUTES: Routes = [{ path: 'PersonalData', component: PersonalDataComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [PersonalDataComponent]
})
export class PersonalDataModule { }
