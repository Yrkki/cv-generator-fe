import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent extends PropertyComponent implements AfterViewChecked {
  ngAfterViewChecked() {
    if (typeof this.portfolioComponent.cv !== 'undefined' && this.portfolioComponent.cv != null) {
      {
        const chartType = 'Language';
        const data = this.portfolioComponent.cv.Languages;
        if (data != null) {
          this.portfolioComponent.drawLanguageChart(chartType, data);
        }
      }
    }
  }
}
