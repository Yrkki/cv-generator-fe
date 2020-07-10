import { TestBed } from '@angular/core/testing';

import { PortfolioService } from './portfolio.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PortfolioService', () => {
  let service: PortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(PortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
