import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapConfigsComponent } from './map-configs.component';

describe('MapConfigsComponent', () => {
  let component: MapConfigsComponent;
  let fixture: ComponentFixture<MapConfigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapConfigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
