import { TestBed } from '@angular/core/testing';

import { MapShapeService } from './map-shape.service';

describe('MapShapeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapShapeService = TestBed.get(MapShapeService);
    expect(service).toBeTruthy();
  });
});
