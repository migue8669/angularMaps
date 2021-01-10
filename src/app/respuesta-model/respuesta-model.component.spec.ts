import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaModelComponent } from './respuesta-model.component';

describe('RespuestaModelComponent', () => {
  let component: RespuestaModelComponent;
  let fixture: ComponentFixture<RespuestaModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespuestaModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
