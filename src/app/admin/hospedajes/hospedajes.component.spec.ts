import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospedajesComponent } from './hospedajes.component';

describe('HospedajesComponent', () => {
  let component: HospedajesComponent;
  let fixture: ComponentFixture<HospedajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospedajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospedajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
