import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { PersonalDataModule } from '../personal-data/personal-data.module';
import { BackgroundModule } from '../background/background.module';
import { AccomplishmentsModule } from '../accomplishments/accomplishments.module';

import { CvComponent } from '../../components/cv/cv.component';
import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

/** Cv module. */
@NgModule({
  declarations: [CvComponent],
  imports: [
    CommonModule,
    CvRoutingModule,
    PersonalDataModule,
    BackgroundModule,
    AccomplishmentsModule,
  ],
  exports: [CvComponent],
  providers: [PortfolioComponent]
})
export class CvModule { }
