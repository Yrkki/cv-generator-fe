// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ImageService } from './image.service';
import { UiEntry } from '../../interfaces/ui/ui-entry';

// eslint-disable-next-line max-lines-per-function
describe('ImageService', () => {
  let service: ImageService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(ImageService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check ui', () => { expect(() => { const readAll = service.ui; }).not.toThrowError(); });

  it('should check getSafeUri', () => {
    expect(() => {
      let readAll;
      service.ui.Search = { text: 'Search' } as UiEntry;
      readAll = service.getSafeUri('');
      service.ui.Search = { text: 'non-Search' } as UiEntry;
      readAll = service.getSafeUri('');

      const searchText = service?.ui?.Search;
      if (searchText) { searchText.text = searchText.text === 'Search' ? 'EncryptedSearch' : 'Search'; }
      readAll = service.getSafeUri('');
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = service.placeholderImageName;
      readAll = service.placeholderImage;

      service.ui.Search = { text: 'Search' } as UiEntry;
      readAll = debugService.dataEncrypted;
      service.ui.Search = { text: 'non-Search' } as UiEntry;
      readAll = debugService.dataEncrypted;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.getAssetUri('imageName');
      readAll = service.getProjectProjectImageUri('imageName');
      readAll = service.getProjectProjectImageUri('imageName', true);
      readAll = service.getProjectProjectImageUri('imageName', false);
      readAll = service.getBackgroundLogoImageUri('imageName');

      readAll = service.isEmptyProjectProjectImage('imageName');
    }).not.toThrowError();
  });
});
