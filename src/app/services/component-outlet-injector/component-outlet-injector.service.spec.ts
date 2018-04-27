import { TestBed, inject } from '@angular/core/testing';

import { ComponentOutletInjectorService } from './component-outlet-injector.service';

describe('ComponentOutletInjectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentOutletInjectorService]
    });
  });

  it('should be created', inject([ComponentOutletInjectorService], (service: ComponentOutletInjectorService) => {
    expect(service).toBeTruthy();
  }));
});
