import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VermicursoPage } from './vermicurso.page';

describe('VermicursoPage', () => {
  let component: VermicursoPage;
  let fixture: ComponentFixture<VermicursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VermicursoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VermicursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
