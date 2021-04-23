import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TruncatorServiceFactory } from './truncator.service.factory';
import { TruncatorKind } from '../../enums/truncator-kind.enum';

import { PersistenceService } from '../../services/persistence/persistence.service';

// eslint-disable-next-line max-lines-per-function
describe('TruncatorServiceFactory', () => {
  let service: TruncatorServiceFactory;
  let persistenceService: PersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(TruncatorServiceFactory);
    persistenceService = TestBed.inject(PersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check public interface properties', () => {
    expect(() => {
      let readAll;
      readAll = TruncatorServiceFactory.TruncatorKindValues;
      readAll = TruncatorServiceFactory.providers;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = TruncatorServiceFactory.tokenDescription(TruncatorKind.Pp);
      TruncatorServiceFactory.TruncatorKindValues.forEach((truncatorKind) => {
        const deps = [persistenceService];
        readAll = TruncatorServiceFactory.InjectionToken(truncatorKind, deps);
        readAll = TruncatorServiceFactory.useFactory(truncatorKind, deps);
      });
    }).not.toThrowError();
  });
});
