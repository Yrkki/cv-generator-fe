import { TestBed } from '@angular/core/testing';

import { ComponentOutletInjectorService } from './component-outlet-injector.service';

describe('ComponentOutletInjectorService', () => {
  let service: ComponentOutletInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentOutletInjectorService]
    });
    service = TestBed.inject(ComponentOutletInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.getInjector({});
      readAll = service.getInjector({}, 1);
    }).not.toThrowError();
  });
});
