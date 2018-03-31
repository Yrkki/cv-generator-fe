import { TestBed, inject } from '@angular/core/testing';

import { StringExService } from './string-ex.service';

describe('StringExService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StringExService]
    });
  });

  it('should be created', inject([StringExService], (service: StringExService) => {
    expect(service).toBeTruthy();
  }));
});
