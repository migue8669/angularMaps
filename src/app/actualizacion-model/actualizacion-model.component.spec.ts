import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionModelComponent } from './actualizacion-model.component';

describe('ActualizacionModelComponent', () => {
  let component: ActualizacionModelComponent;
  let fixture: ComponentFixture<ActualizacionModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizacionModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizacionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
