import { Component, Injector, AfterViewInit } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

import { ComponentOutletInjectorService } from '../../services/component-outlet-injector/component-outlet-injector.service';

/**
 * CV component
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements AfterViewInit {
  /** The injector cache holder */
  private injectorCache = {};

  /**
   * Constructs a CV component.
   * ~constructor
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param injector The injector injected dependency.
   * @param componentOutletInjectorService The component outlet injector service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    private persistenceService: PersistenceService,
    private injector: Injector,
    private componentOutletInjectorService: ComponentOutletInjectorService) {
    componentOutletInjectorService.init(injector, this.injectorCache);
  }

  /** AfterViewInit handler */
  ngAfterViewInit() {
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    ['Curriculum Vitae'].forEach((_) => this.persistenceService.restoreToggle(document, _));
  }

  /** Save toggle delegate. */
  saveToggle(event: MouseEvent) {
    this.persistenceService.saveToggle(event);
  }
}
