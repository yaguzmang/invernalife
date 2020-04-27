import { TestBed } from '@angular/core/testing';

import { AdministradorServiceService } from './administrador-service.service';

describe('AdministradorServiceService', () => {
  let service: AdministradorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministradorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
