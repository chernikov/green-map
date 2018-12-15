import { TestBed } from '@angular/core/testing';

import { ShapeImageUploadService } from './shape-image-upload.service';

describe('ShapeImageUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShapeImageUploadService = TestBed.get(ShapeImageUploadService);
    expect(service).toBeTruthy();
  });
});
