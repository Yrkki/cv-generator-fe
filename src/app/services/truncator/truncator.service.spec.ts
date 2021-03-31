import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TruncatorService } from './truncator.service';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';

describe('TruncatorService', () => {
  const truncatorService: { [key: string]: TruncatorService } = {
    Cv: {} as TruncatorService,
    Ps: {} as TruncatorService,
    Pp: {} as TruncatorService
  };

  let persistenceService: PersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        TruncatorService,
      ]
    });
    TruncatorService.TruncatorKindValues.forEach((truncatorKind) => {
      truncatorService[TruncatorKind[truncatorKind]] = TestBed.inject(TruncatorService.InjectionToken(truncatorKind,
        persistenceService = TestBed.inject(PersistenceService)
      ));
    });
  });

  it('should be created', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(service).toBeTruthy();
    });
  });

  it('should check public interface properties', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        let readAll;
        service.truncatorKind = service.truncatorKind;
        service.TagCloudEmphasis = service.TagCloudEmphasis;
        service.FocusThreshold = service.FocusThreshold;

        readAll = TruncatorService.focusThresholdDefaults;
        readAll = TruncatorService.focusThresholdDisplayValue;
        readAll = TruncatorService.focusThresholdPropertyName;
        readAll = TruncatorService.TruncatorKindValues;
        readAll = TruncatorService.providers;
      }).not.toThrowError();
    });
  });

  it('should check public interface methods', () => {
    Object.values(truncatorService).forEach((service) => {
      expect(() => {
        let readAll;
        readAll = TruncatorService.tokenDescription(TruncatorKind.Pp);
        TruncatorService.TruncatorKindValues.forEach((truncatorKind) => {
          const deps = [persistenceService];
          readAll = TruncatorService.InjectionToken(truncatorKind, deps);
          readAll = TruncatorService.useFactory(truncatorKind, deps);
        });
        readAll = service.truncated([]);
        readAll = service.remaining([]);
        readAll = service.remainingLength([]);
        readAll = service.modelChange('readAll', 5);
      }).not.toThrowError();
    });
  });
});
