import { TestBed } from '@angular/core/testing';

import { ToggleService } from './toggle.service';
import { HttpClientModule } from '@angular/common/http';

// eslint-disable-next-line max-lines-per-function
describe('ToggleService', () => {
  let service: ToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ToggleService,
      ]
    });
    service = TestBed.inject(ToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;

      readAll = ToggleService.displayValues;
      readAll = service.captions;
      readAll = service.decorations;
      readAll = service.toggleKindValues;

      readAll = service.persistenceService;
    }).not.toThrowError();
  });

  it('should check public interface toggleKind dependent methods', () => {
    expect(() => {
      let readAll;
      service.toggleKindValues.forEach((toggleKind) => {
        readAll = service.displayValue(toggleKind);
        readAll = service.isSharedPropertyName(toggleKind);
        readAll = service.multiModel(toggleKind);
      });
    }).not.toThrowError();
  });
});
