import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { DynamicPersisted } from './dynamic-persisted.decorator';
import { ThemeChangerService } from './theme-changer.service';

describe('dynamic-persisted.decorator', () => {
  beforeEach(() => {
    let service: ThemeChangerService;
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ThemeChangerService
      ]
    });
    service = TestBed.inject(ThemeChangerService);
  });

  it('should be created', inject([ThemeChangerService], (service: ThemeChangerService) => {
    DynamicPersisted<ThemeChangerService>('onThemeChange', 'persistenceService', 'default');
    DynamicPersisted<ThemeChangerService>('onThemeChange', 'persistenceService', 'default1', 'default2');
    expect(service).toBeTruthy();
  }));
});
