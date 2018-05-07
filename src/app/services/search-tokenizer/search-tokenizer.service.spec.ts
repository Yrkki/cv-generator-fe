import { TestBed, inject } from '@angular/core/testing';

import { SearchTokenizerService } from './search-tokenizer.service';

describe('SearchTokenizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchTokenizerService]
    });
  });

  it('should be created', inject([SearchTokenizerService], (service: SearchTokenizerService) => {
    expect(service).toBeTruthy();
  }));
});
