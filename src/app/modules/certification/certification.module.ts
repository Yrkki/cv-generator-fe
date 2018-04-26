import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CertificationComponent } from '../../components/certification/certification.component';

export const ROUTES: Routes = [{ path: 'Certification', component: CertificationComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [CertificationComponent]
})
export class CertificationModule { }
