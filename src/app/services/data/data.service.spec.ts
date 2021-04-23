import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';
// import { HttpClient, HttpHandler } from '@angular/common/http';
import { take } from 'rxjs/operators';

// eslint-disable-next-line max-lines-per-function
describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService,
        // HttpClient,
        // HttpHandler
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DataService);
  });

  // afterEach(() => {
  //   httpTestingController.verify();
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should serve data', () => {
    expect(() => {
      service.getUi().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });
      service.getEntities().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });

      service.getCv().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });
      service.getProfessionalExperience().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });
      service.getEducation().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });
      service.getAccomplishments().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });
      service.getPublications().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });
      service.getProjects().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });

      service.getGeneralTimeline().pipe(take(1)).subscribe((_) => { expect(Object.keys(_).length).toBeGreaterThan(0); });
    }).not.toThrowError();
  });

  it('should provide version', () => {
    expect(() => {
      service.getVersion();
    }).not.toThrowError();
  });

  it('should check public interface', () => {
    expect(() => {
      let readAll;
      [false, true, undefined].forEach((_) => readAll = service.imageDataService.getProjectProjectImageUri('', _));
      readAll = service.imageDataService.getProjectLogoUri('');
      readAll = service.imageDataService.getAccomplishmentAuthorityImageUri('');
      [false, true, undefined].forEach((_) => readAll = service.imageDataService.getAccomplishmentCertificateImageUri('', _));
      [false, true, undefined].forEach((_) => readAll = service.imageDataService.getAccomplishmentCertificateLogoImageUri('', _));
      [false, true, undefined].forEach((_) => readAll = service.imageDataService.getAccomplishmentPublicationLogoImageUri('', _));
      readAll = service.imageDataService.getBackgroundLogoImageUri('');
      readAll = service.imageDataService.getAssetUri('');
      readAll = service.getResourceUri('', '');
      readAll = service.urlResolve('', '');
    }).not.toThrowError();
  });

  // describe('#getUi', () => {
  //   it('should return an Observable<UiEntry[]>', () => {
  //     service.getUi().pipe(take(1)).subscribe(ui => {
  //       expect(ui.length).toBeGreaterThan(0);
  //       const key = 'Search';
  //       expect(ui[key].text).toEqual(key);
  //     });

  //     const dummyUi = { 'CV Generator': { 'text': 'CV Generator' }, 'Search': { 'text': 'Search' }, 'Delete': { 'text': '×' } };
  //     // const SERVER_ENDPOINT_URI = process.env.serverEndpointUri ?? 'https://cv-generator-project-server.herokuapp.com';
  //     const SERVER_ENDPOINT_URI = process.env.serverEndpointUri ?? 'http://192.168.1.6:3000';
  //     const SERVER_ENDPOINT_JSON_URI = `${SERVER_ENDPOINT_URI}/json`;
  //     const req = httpTestingController.expectOne(`${SERVER_ENDPOINT_JSON_URI}/ui.json`);
  //     expect(req.request.method).toBe('GET');
  //     req.flush(dummyUi);
  //   });

  //   // afterEach(() => {
  //   //   httpTestingController.verify();
  //   // });
  // });
});
