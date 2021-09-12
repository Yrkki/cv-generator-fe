// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Component, AfterViewInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';

import ConfigJSON from './badge.config.json';

/**
 * pipeline component.
 * ~extends {@link FooterComponent}
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss']
})
export class PipelineComponent extends FooterComponent implements AfterViewInit {
  /** The component key */
  public get key() { return 'Pipeline'; }

  /** Config. */
  public get Config() { return ConfigJSON; }

  /**
   * Constructs the pipeline component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   */
  constructor(
    public portfolioService: PortfolioService,
    public entitiesService: EntitiesService,
    public inputService: InputService,
    public uiService: UiService,
    public persistenceService: PersistenceService,
    public dataService: DataService
  ) {
    super(portfolioService, entitiesService, inputService, uiService, persistenceService, dataService);
  }
}
