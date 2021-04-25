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
  private get dataEncrypted(): boolean { return !this.ui || !this.ui.Search || this.ui.Search.text !== 'Search'; }

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
