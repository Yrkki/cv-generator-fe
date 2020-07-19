import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MockDataService } from './mock-data.service';
// import { HttpClient, HttpHandler } from '@angular/common/http';
import { take } from 'rxjs/operators';

describe('MockDataService', () => {
  let service: MockDataService;
  // let httpClient: HttpClient;
  // let httpHandler: HttpHandler;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockDataService,
        // HttpClient,
        // HttpHandler,
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    // httpClient = TestBed.inject(HttpClient);
    // httpHandler = TestBed.inject(HttpHandler);
    service = TestBed.inject(MockDataService);
  });

  // afterEach(() => {
  //   httpTestingController.verify();
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface', () => {
    expect(() => {
      service.getUi().pipe(take(1)).subscribe(_ => {
        expect(Object.keys(_).length).toBe(Object.keys(service.mockUi).length); expect(_).toEqual(service.mockUi);
      });
      service.getEntities().pipe(take(1)).subscribe(_ => { expect(Object.keys(_).length).toBeGreaterThan(0); });

      service.getCv().pipe(take(1)).subscribe(_ => { expect(Object.keys(_).length).toBeGreaterThan(0); });
      service.getProjects().pipe(take(1)).subscribe(_ => { expect(Object.keys(_).length).toBeGreaterThan(0); });

      service.getGeneralTimeline().pipe(take(1)).subscribe(_ => { expect(Object.keys(_).length).toBeGreaterThan(0); });
    }).not.toThrowError();
  });

  // describe('#getUi', () => {
  //   it('should return an Observable<UiEntry[]>', () => {
  //     const dummyUi = service.mockUi;
  //     service.getUi().pipe(take(1)).subscribe(ui => {
  //       expect(ui.length).toBe(dummyUi.length);
  //       expect(ui).toEqual(dummyUi);
  //     });

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
