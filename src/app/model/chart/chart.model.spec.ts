import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ChartModel } from './chart.model';

// eslint-disable-next-line max-lines-per-function
describe('ChartModel', () => {
  let model: ChartModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    model = TestBed.inject(ChartModel);
  });

  it('should be created', () => {
    expect(model).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      // let readAll;
      model.chartLoaded = model.chartLoaded;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      // let readAll;
    }).not.toThrowError();
  });
});
