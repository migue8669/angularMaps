import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenModelComponent } from './imagen-model.component';

describe('ImagenModelComponent', () => {
  let component: ImagenModelComponent;
  let fixture: ComponentFixture<ImagenModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
