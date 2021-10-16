// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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
import { Injectable } from '@angular/core';

import { PortfolioModel } from '../../model/portfolio/portfolio.model';

import { DataService } from '../../services/data/data.service';

/**
 * A Image service.
 */
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  /** UI data getter. */
  public get ui() { return this.portfolioModel.ui; }

  /** Images data location. */
  private readonly images: string = this.dataService.urlResolve('/assets', 'images');
  /** Placeholder image name. */
  public readonly placeholderImageName = 'Empty.png';
  /** Placeholder image delegate. */
  public readonly placeholderImage = this.dataService.urlResolve(this.images, this.placeholderImageName);

  /**
   * Constructs the Image service.
   * ~constructor
   *
   * @param portfolioModel The portfolio model injected dependency.
   * @param dataService The data service injected dependency.
   */
  constructor(
    private portfolioModel: PortfolioModel,
    private dataService: DataService,
  ) {
  }

  /**
   * Gets a project image uri.
   *
   * @param imageName The image name.
   * @param full The full-size-resource switcher request.
   *
   * @returns The project image uri.
   */
  public getProjectProjectImageUri(imageName: string, full: boolean = false): string {
    return this.getSafeUri(this.dataService.imageDataService.getProjectProjectImageUri(imageName, full));
  }

  /**
   * Gets a background logo image uri.
   *
   * @param imageName The image name.
   *
   * @returns The background logo image uri.
   */
  public getBackgroundLogoImageUri(imageName: string): string {
    return this.getSafeUri(this.dataService.imageDataService.getBackgroundLogoImageUri(imageName));
  }

  /**
   * Gets an asset image.
   *
   * @param imageName The image name.
   *
   * @returns The asset image.
   */
  public getAssetUri(imageName: string): string {
    return this.getSafeUri(this.dataService.imageDataService.getAssetUri(imageName));
  }

  /**
   * Gets a safe uri.
   *
   * @param url The url to process.
   *
   * @returns The safe uri.
   */
  public getSafeUri(url: string): string {
    return this.dataEncrypted ? this.placeholderImage : url;
  }

  /** Data encrypted predicate property. */
  private get dataEncrypted(): boolean { return this.ui.Search?.text !== 'Search'; }

  /**
   * Is empty project image.
   *
   * @param imageName The image name.
   *
   * @returns Whether the project image is empty.
   */
  public isEmptyProjectProjectImage(imageName: string): boolean {
    return imageName === this.placeholderImageName || this.getProjectProjectImageUri(imageName) === this.placeholderImage;
  }
}
