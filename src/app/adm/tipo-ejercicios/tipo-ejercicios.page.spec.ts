import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEjerciciosPage } from './tipo-ejercicios.page';

describe('TipoEjerciciosPage', () => {
  let component: TipoEjerciciosPage;
  let fixture: ComponentFixture<TipoEjerciciosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoEjerciciosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEjerciciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
