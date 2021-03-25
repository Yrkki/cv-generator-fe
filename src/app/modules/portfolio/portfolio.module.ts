import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { NavigationModule } from '../navigation/navigation.module';
import { SearchModule } from '../search/search.module';
import { CvModule } from '../cv/cv.module';
import { ProjectGanttChartMapModule } from '../project-gantt-chart-map/project-gantt-chart-map.module';
import { ProjectSummaryModule } from '../project-summary/project-summary.module';
import { ProjectModule } from '../project/project.module';
import { GeneralTimelineModule } from '../general-timeline/general-timeline.module';
import { PipelineModule } from '../pipeline/pipeline.module';
import { ServiceCatalogModule } from '../service-catalog/service-catalog.module';
import { VersionModule } from '../version/version.module';
import { FooterModule } from '../footer/footer.module';
import { ToggleModule } from '../toggle/toggle.module';
import { TruncatorModule } from '../truncator/truncator.module';
import { ThemeChangerModule } from '../theme-changer/theme-changer.module';
import { SettingsSharerModule } from '../settings-sharer/settings-sharer.module';
import { PropertyModule } from '../property/property.module';

import { PortfolioComponent } from '../../components/portfolio/portfolio.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';

/** Portfolio module. */
@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    CommonModule,
    FormsModule,
    PortfolioRoutingModule,
    NavigationModule,
    SearchModule,
    CvModule,
    ProjectGanttChartMapModule,
    ProjectSummaryModule,
    ProjectModule,
    GeneralTimelineModule,
    PipelineModule,
    ServiceCatalogModule,
    VersionModule,
    FooterModule,
    ToggleModule,
    TruncatorModule,
    ThemeChangerModule,
    SettingsSharerModule,
    PropertyModule
  ],
  exports: []
})
export class PortfolioModule {
  constructor(@Optional() @SkipSelf() parentModule?: PortfolioModule) {
    if (parentModule) {
      throw new Error(
        'PortfolioModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<PortfolioModule> {
    return {
      ngModule: PortfolioModule,
      providers: [ PortfolioService ]
    };
  }
}
