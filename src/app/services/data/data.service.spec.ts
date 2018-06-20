import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should serve data', inject([DataService], (service: DataService) => {
    expect(() => {
      service.getUi();
      service.getEntities();

      service.getCv();
      service.getProjects();

      service.getGeneralTimeline();
    }).not.toThrowError();
  }));

  it('should provide version', inject([DataService], (service: DataService) => {
    expect(() => {
      service.getVersion();
    }).not.toThrowError();
  }));

  it('should check public interface', inject([DataService], (service: DataService) => {
    expect(() => {
      let readAll;
      [false, true].forEach(_ => readAll = service.getProjectProjectImageUri('', _));
      readAll = service.getProjectLogoUri('');
      readAll = service.getAccomplishmentAuthorityImageUri('');
      [false, true].forEach(_ => readAll = service.getAccomplishmentCertificateImageUri('', _));
      [false, true].forEach(_ => readAll = service.getAccomplishmentCertificateLogoImageUri('', _));
      [false, true].forEach(_ => readAll = service.getAccomplishmentPublicationLogoImageUri('', _));
      readAll = service.getBackgroundLogoImageUri('');
      readAll = service.getThemesUri();
      readAll = service.getThemeUri('');
      readAll = service.getThemesDefaultUri();
      readAll = service.getResourceUri('', '');
      readAll = service.urlResolve('', '');
      [false, true].forEach(_ => readAll = service.fullConvert('', _));
    }).not.toThrowError();
  }));
});
