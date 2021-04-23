import { TestBed, inject } from '@angular/core/testing';

import { ChartColorService } from './chart-color.service';

// eslint-disable-next-line max-lines-per-function
describe('ChartColorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartColorService]
    });
  });

  it('should be created', inject([ChartColorService], (service: ChartColorService) => {
    expect(service).toBeTruthy();
  }));

  it('should check public interface properties', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });

  it('should check public interface methods', inject([ChartColorService], (service: ChartColorService) => {
    expect(() => {
      let readAll;
      readAll = service.initColors();
      readAll = service.nextBackgroundColor();
      readAll = service.nextHoverBackgroundColor();
    }).not.toThrowError();
  }));
});
