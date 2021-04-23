import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ImageService } from './image.service';

// eslint-disable-next-line max-lines-per-function
describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check ui', () => { expect(() => { const readAll = service.ui; }).not.toThrowError(); });

  it('should check getSafeUri', () => {
    expect(() => {
      let readAll;
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
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.getAssetUri('imageName');
      readAll = service.getProjectProjectImageUri('imageName');
      readAll = service.getProjectProjectImageUri('imageName', true);
      readAll = service.getBackgroundLogoImageUri('imageName');

      readAll = service.isEmptyProjectProjectImage('imageName');
    }).not.toThrowError();
  });
});
