import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from '../../components/footer/footer.component';
import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

export const ROUTES: Routes = [{ path: 'Footer', component: FooterComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), FormsModule],
  exports: [FooterComponent],
  declarations: [FooterComponent],
  providers: [PortfolioComponent]
})
export class FooterModule { }
