import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MishorariosPage } from './mishorarios.page';

describe('MishorariosPage', () => {
  let component: MishorariosPage;
  let fixture: ComponentFixture<MishorariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MishorariosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MishorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
