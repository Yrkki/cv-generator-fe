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
import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { UiService } from '../../services/ui/ui.service';
import { DataLoaderService } from '../../services/data-loader/data-loader.service';
import { Title } from '@angular/platform-browser';

/**
 * Personal webpage component
 * ~implements {@link OnInit}
 */
@Component({
  standalone: false,
  selector: 'app-webpage',
  templateUrl: './webpage.component.html',
  styleUrls: ['./webpage.component.scss']
})
export class WebpageComponent implements OnInit {
  /** Name. */
  public get name() {
    const name = this.uiText('Author name');
    this.setTitle(name);
    return name;
  }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.toolbarService.decorations; }

  /** UI delegate. */
  public get ui() { return this.portfolioService.model.ui; }

  /**
   * Constructs the personal webpage component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param dataLoaderService The data loader service injected dependency.
   * @param titleService The title service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly uiService: UiService,
    private readonly dataLoaderService: DataLoaderService,
    private readonly titleService: Title) {
  }

  /** Initialization */
  ngOnInit() {
    this.dataLoaderService.LoadData();
  }

  /**
   * Sets a new page title.
   *
   * @param newTitle The new page title to set.
   */
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  /** UI safe text. Switchable to placeholder or blank. */
  public uiText(key: string): string { return this.uiService.uiSlowText(key); }
}
