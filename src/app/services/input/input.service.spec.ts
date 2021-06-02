import { TestBed } from '@angular/core/testing';

import { InputService } from './input.service';

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

      readAll = debugService.keypress(undefined);
    }).not.toThrowError();
  });
});
