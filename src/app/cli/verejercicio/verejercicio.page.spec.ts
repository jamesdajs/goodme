import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerejercicioPage } from './verejercicio.page';

describe('VerejercicioPage', () => {
  let component: VerejercicioPage;
  let fixture: ComponentFixture<VerejercicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerejercicioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerejercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
