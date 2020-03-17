import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoscapturadosComponent } from './datoscapturados.component';

describe('DatoscapturadosComponent', () => {
  let component: DatoscapturadosComponent;
  let fixture: ComponentFixture<DatoscapturadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatoscapturadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatoscapturadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
