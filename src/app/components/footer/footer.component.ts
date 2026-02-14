// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// eslint-disable-next-line no-redeclare
/*global globalThis*/
import { Component, AfterViewInit, Input, ViewChildren, QueryList } from '@angular/core';
import { take } from 'rxjs/operators';

import { FooterProviderComponent } from '../footer-provider/footer-provider.component';

import { ToggleKind } from '../../enums/toggle-kind.enum';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { EntitiesService } from '../../services/entities/entities.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { DataService } from '../../services/data/data.service';

import { HeaderComponent } from '../header/header.component';

import ConfigJSON from './badge.config.json';

/**
 * Footer component.
 * ~extends {@link FooterProviderComponent}
 * ~implements {@link AfterViewInit}
 */
@Component({
  standalone: false,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends FooterProviderComponent implements AfterViewInit {
  /** The app version string. */
  public version = '';

  /** Config. */
  public get Config() { return ConfigJSON; }

  /** Leaves count. */
  public get LeavesCount() { return this.Config.map((_) => _.length).reduce((acc, bin) => acc + bin); }

  /** Header component. */
  @ViewChildren(HeaderComponent) headerComponents?: QueryList<HeaderComponent>;

  /** Toggle kind enum template accessor getter. */
  public get ToggleKind() { return ToggleKind; }

  /** Expand toggle getter. */
  public get Expand() {
    return this.persistenceService.getItem(this.expandKey) === 'true';
  }
  /** Expand toggle setter. */
  @Input() public set Expand(value) {
    this.persistenceService.setItem(this.expandKey, value.toString());
  }

  /** The server url. */
  public readonly qualifiedHostname = globalThis.location.protocol + '//' + globalThis.location.hostname;

  /**
   * Constructs the Footer component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param entitiesService The entities service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   * @param dataService The data service injected dependency.
   */
  constructor(
    public override readonly portfolioService: PortfolioService,
    public readonly entitiesService: EntitiesService,
    public override readonly inputService: InputService,
    public override readonly uiService: UiService,
    public override readonly persistenceService: PersistenceService,
    public readonly dataService: DataService
  ) {
    super(portfolioService, inputService, uiService, persistenceService);
  }

  /** Initialization */
  ngAfterViewInit() {
    // setTimeout(() => this.Initialize());
    this.Initialize();
  }

  /** Initialization */
  Initialize() {
    // setTimeout(() => this.portfolioService.model.countCache[this.key] = this.LeavesCount);
    this.portfolioService.model.countCache[this.key] = this.LeavesCount;

    this.getVersion();

    this.persistenceService.restoreToggle(document, this.key);
  }

  /** Loads the Version. */
  private getVersion(): void {
    this.dataService.getVersion().pipe(take(1)).subscribe((version) => {
      this.version = version.builds[0].version.replace('-', '–');
    });
  }
}
