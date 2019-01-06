import { TestBed } from '@angular/core/testing';

import { InvalidApiService } from './invalid-api.service';

describe('InvalidApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvalidApiService = TestBed.get(InvalidApiService);
    expect(service).toBeTruthy();
  });
});
