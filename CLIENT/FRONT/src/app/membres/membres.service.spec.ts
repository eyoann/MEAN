import { TestBed } from '@angular/core/testing';

import { MembresService } from './membres.service';

describe('MembresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MembresService = TestBed.get(MembresService);
    expect(service).toBeTruthy();
  });
});
