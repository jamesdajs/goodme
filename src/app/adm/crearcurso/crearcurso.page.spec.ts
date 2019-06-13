import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearcursoPage } from './crearcurso.page';

describe('CrearcursoPage', () => {
  let component: CrearcursoPage;
  let fixture: ComponentFixture<CrearcursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearcursoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearcursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
