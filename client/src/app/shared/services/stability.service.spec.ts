import { TestBed } from '@angular/core/testing';

import { StabilityService } from './stability.service';

describe('StabilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StabilityService = TestBed.get(StabilityService);
    expect(service).toBeTruthy();
  });
});
