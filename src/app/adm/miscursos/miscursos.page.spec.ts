import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscursosPage } from './miscursos.page';

describe('MiscursosPage', () => {
  let component: MiscursosPage;
  let fixture: ComponentFixture<MiscursosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscursosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscursosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
