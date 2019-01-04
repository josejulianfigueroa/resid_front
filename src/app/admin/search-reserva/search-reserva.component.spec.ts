import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReservaComponent } from './search-reserva.component';

describe('SearchReservaComponent', () => {
  let component: SearchReservaComponent;
  let fixture: ComponentFixture<SearchReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
