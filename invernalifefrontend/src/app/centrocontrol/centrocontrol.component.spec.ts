import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrocontrolComponent } from './centrocontrol.component';

describe('CentrocontrolComponent', () => {
  let component: CentrocontrolComponent;
  let fixture: ComponentFixture<CentrocontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentrocontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentrocontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
