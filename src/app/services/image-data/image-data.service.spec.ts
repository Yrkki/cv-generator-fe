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
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ImageDataService } from './image-data.service';
// import { HttpClient, HttpHandler } from '@angular/common/http';

// eslint-disable-next-line max-lines-per-function
describe('ImageDataService', () => {
  let service: ImageDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ImageDataService,
        // HttpClient,
        // HttpHandler
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ImageDataService);
  });

  // afterEach(() => {
  //   httpTestingController.verify();
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      [false, true, undefined].forEach((_) => readAll = service.getProjectProjectImageUri('', _));
      readAll = service.getProjectLogoUri('');
      readAll = service.getAccomplishmentAuthorityImageUri('');
      [false, true, undefined].forEach((_) => readAll = service.getAccomplishmentCertificateImageUri('', _));
      [false, true, undefined].forEach((_) => readAll = service.getAccomplishmentCertificateLogoImageUri('', _));
      [false, true, undefined].forEach((_) => readAll = service.getAccomplishmentPublicationLogoImageUri('', _));
      readAll = service.getBackgroundLogoImageUri('');
      readAll = service.getAssetUri('');
      readAll = service.urlResolve('', '');
    }).not.toThrowError();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
