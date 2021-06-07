import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DynamicPersisted } from './dynamic-persisted.decorator';
import { ThemeChangerService } from './theme-changer.service';

describe('dynamic-persisted.decorator', () => {
  let service: ThemeChangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ThemeChangerService
      ]
    });
    service = TestBed.inject(ThemeChangerService);
  });

  it('should be created', () => {
    DynamicPersisted<ThemeChangerService>('onThemeChange', 'persistenceService', 'default');
    DynamicPersisted<ThemeChangerService>('onThemeChange', 'persistenceService', 'default1', 'default2');
    DynamicPersisted<ThemeChangerService>('onThemeChange', 'persistenceService', 'default3', undefined);
    expect(service).toBeTruthy();
  });
});
