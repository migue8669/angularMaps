import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaFormComponent } from './mapa-form.component';

describe('MapaFormComponent', () => {
  let component: MapaFormComponent;
  let fixture: ComponentFixture<MapaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
