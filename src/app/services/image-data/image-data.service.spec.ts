import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ImageDataService } from './image-data.service';
// import { HttpClient, HttpHandler } from '@angular/common/http';

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
      [false, true, undefined].forEach(_ => readAll = service.getProjectProjectImageUri('', _));
      readAll = service.getProjectLogoUri('');
      readAll = service.getAccomplishmentAuthorityImageUri('');
      [false, true, undefined].forEach(_ => readAll = service.getAccomplishmentCertificateImageUri('', _));
      [false, true, undefined].forEach(_ => readAll = service.getAccomplishmentCertificateLogoImageUri('', _));
      [false, true, undefined].forEach(_ => readAll = service.getAccomplishmentPublicationLogoImageUri('', _));
      readAll = service.getBackgroundLogoImageUri('');
      readAll = service.getAssetUri('');
      readAll = service.urlResolve('', '');
    }).not.toThrowError();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
