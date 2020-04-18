import { TestBed } from '@angular/core/testing';

import { CentroControlServiceService } from './centro-control-service.service';

describe('CentroControlServiceService', () => {
  let service: CentroControlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroControlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
