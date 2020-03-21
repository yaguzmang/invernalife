import { TestBed } from '@angular/core/testing';

import { DatosCapturadosService } from './datos-capturados-service.service';

describe('DatosCapturadosServiceService', () => {
  let service: DatosCapturadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosCapturadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
