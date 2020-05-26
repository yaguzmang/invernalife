import { TestBed } from '@angular/core/testing';

import { ReportesServiceService } from './reportes-service.service';

describe('ReportesServiceService', () => {
  let service: ReportesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
