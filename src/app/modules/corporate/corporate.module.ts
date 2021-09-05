import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateRoutingModule } from './corporate-routing.module';
import { SocBarModule } from '../soc-bar/soc-bar.module';

import { CorporateComponent } from '../../components/corporate/corporate.component';

/** Corporate module. */
@NgModule({
  declarations: [CorporateComponent],
  imports: [
    CommonModule,
    CorporateRoutingModule,
    SocBarModule,
  ],
  exports: [CorporateComponent]
})
export class CorporateModule { }
