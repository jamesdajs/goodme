import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosdetallePage } from './alumnosdetalle.page';

describe('AlumnosdetallePage', () => {
  let component: AlumnosdetallePage;
  let fixture: ComponentFixture<AlumnosdetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosdetallePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosdetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
