import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EducationComponent } from '../../components/education/education.component';

export const ROUTES: Routes = [{ path: 'Education', component: EducationComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [EducationComponent]
})
export class EducationModule { }
