import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VercursoPage } from './vercurso.page';

describe('VercursoPage', () => {
  let component: VercursoPage;
  let fixture: ComponentFixture<VercursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VercursoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VercursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
