import { TestBed } from '@angular/core/testing';

import { InputService } from './input.service';

// eslint-disable-next-line max-lines-per-function
describe('InputService', () => {
  let service: InputService;
  let debugService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputService);
    debugService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check keypress event handler', () => {
    expect(() => {
      let readAll;
      readAll = service.keypress(new KeyboardEvent('keypress', { key: 'Enter' }));
      readAll = service.keypress(new KeyboardEvent('keypress', { key: 'T' }));
    }).not.toThrowError();
  });

  it('should process keypress enter', () => {
    expect(() => {
      const readAll = debugService.processKeypressEnter(new KeyboardEvent('keypress', { key: 'Enter' }));
    }).not.toThrowError();
  });
});
