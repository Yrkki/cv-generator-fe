import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProfessionalExperienceComponent } from '../../components/professional-experience/professional-experience.component';
import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

export const ROUTES: Routes = [{ path: 'ProfessionalExperience', component: ProfessionalExperienceComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [ProfessionalExperienceComponent],
  providers: [PortfolioComponent]
})
export class ProfessionalExperienceModule { }
