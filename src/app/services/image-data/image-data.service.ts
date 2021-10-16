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
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

/**
 * Data connection service.
 *
 * Retrieves data from a project server.
 */
@Injectable({
  providedIn: 'root'
})
export class ImageDataService {
  /** The data server endpoint. */
  private serverEndpointUri = environment.serverEndpointUri;

  /** The images data path. */
  private images: string = this.urlResolve(this.serverEndpointUri, 'images');
  /** The images logos data path. */
  private imagesLogos: string = this.urlResolve(this.images, 'logos');
  /** The images projects data path. */
  private imagesProjects: string = this.urlResolve(this.images, 'projects');
  /** The images assets data path. */
  private imagesAssets: string = this.urlResolve(this.images, 'assets');
  /** The images accomplishments data path. */
  private imagesAccomplishments: string = this.urlResolve(this.images, 'accomplishments');
  /** The images accomplishments authorities data path. */
  private imagesAccomplishmentsAuthorities: string = this.urlResolve(this.imagesAccomplishments, 'authorities');
  /** The images accomplishments certificates data path. */
  private imagesAccomplishmentsCertificates: string = this.urlResolve(this.imagesAccomplishments, 'certificates');
  /** The images accomplishments certificates logos data path. */
  private imagesAccomplishmentsCertificatesLogos: string = this.urlResolve(this.imagesAccomplishmentsCertificates, 'logos');
  /** The images accomplishments publications data path. */
  private imagesAccomplishmentsPublications: string = this.urlResolve(this.imagesAccomplishments, 'publications');
  /** The images accomplishments publications logos data path. */
  private imagesAccomplishmentsPublicationsLogos: string = this.urlResolve(this.imagesAccomplishmentsPublications, 'logos');
  /** The images background data path. */
  private imagesBackground: string = this.urlResolve(this.images, 'background');
  /** The images backgroundLogos data path. */
  private imagesBackgroundLogos: string = this.urlResolve(this.imagesBackground, 'logos');
  /** The images full data path. */
  private imagesFull: string = this.urlResolve(this.images, 'full');

  /**
   * Constructs the data service.
   * ~constructor
   *
   * @param httpClient The http client for requests to the server.
   */
  constructor(protected httpClient: HttpClient) {
  }

  /**
   * Retrieves a project image URI.
   *
   * @param imageName The image name.
   * @param full The full-size-resource switcher request.
   *
   * @returns The project image URI.
   */
  getProjectProjectImageUri(imageName: string, full: boolean = false): string {
    const uri = this.urlResolve(this.fullConvert(this.imagesProjects, full), imageName);
    return uri;
  }

  /**
   * Retrieves a project logo image URI.
   *
   * @param imageName The image name.
   *
   * @returns The project logo image URI.
   */
  getProjectLogoUri(imageName: string): string {
    const uri = this.urlResolve(this.imagesLogos, imageName);
    return uri;
  }

  /**
   * Retrieves an accomplishment authority image URI.
   *
   * @param imageName The image name.
   *
   * @returns The accomplishment authority image URI.
   */
  getAccomplishmentAuthorityImageUri(imageName: string): string {
    const uri = this.urlResolve(this.imagesAccomplishmentsAuthorities, imageName);
    return uri;
  }

  /**
   * Retrieves an accomplishment certificate image URI.
   *
   * @param imageName The image name.
   * @param full The full-size-resource switcher request.
   *
   * @returns The accomplishment certificate image URI.
   */
  getAccomplishmentCertificateImageUri(imageName: string, full: boolean = false): string {
    const uri = this.urlResolve(this.fullConvert(this.imagesAccomplishmentsCertificates, full), imageName);
    return uri;
  }

  /**
   * Retrieves an accomplishment certificate logo image URI.
   *
   * @param imageName The image name.
   * @param full The full-size-resource switcher request.
   *
   * @returns The accomplishment certificate logo image URI.
   */
  getAccomplishmentCertificateLogoImageUri(imageName: string, full: boolean = false): string {
    const uri = this.urlResolve(this.fullConvert(this.imagesAccomplishmentsCertificatesLogos, full), imageName);
    return uri;
  }

  /**
   * Retrieves an accomplishment publication logo image URI.
   *
   * @param imageName The image name.
   * @param full The full-size-resource switcher request.
   *
   * @returns The accomplishment publication logo image URI.
   */
  getAccomplishmentPublicationLogoImageUri(imageName: string, full: boolean = false): string {
    const uri = this.urlResolve(this.fullConvert(this.imagesAccomplishmentsPublicationsLogos, full), imageName);
    return uri;
  }

  /**
   * Retrieves a background logo image URI.
   *
   * @param imageName The image name.
   *
   * @returns The background logo image URI.
   */
  getBackgroundLogoImageUri(imageName: string): string {
    const uri = this.urlResolve(this.imagesBackgroundLogos, imageName);
    return uri;
  }

  /**
   * Retrieves an asset image URI.
   * ~delegate
   *
   * @param imageName The image name.
   *
   * @returns The asset image URI.
   */
  getAssetUri(imageName: string): string {
    const uri = this.urlResolve(this.imagesAssets, imageName);
    return uri;
  }

  /**
   * Resolves an url to a base.
   *
   * @param base The base.
   * @param url The url to process.
   *
   * @returns The resolved url.
   */
  urlResolve(base: string, url: string): string {
    return base + '/' + url;
  }

  /**
   * Match an url to a full-size-resource version.
   *
   * @param uri The uri to match.
   * @param full The full-size-resource switcher request.
   *
   * @returns The full-size-resource uri version.
   */
  private fullConvert(uri: string, full: boolean = false): string {
    let base = uri;
    if (full) {
      base = base.replace(this.images, this.imagesFull);
    }
    return base;
  }
}
