import { TestBed, inject } from '@angular/core/testing';

import { NonAuthGuard } from './non-auth.guard';

describe('NonAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NonAuthGuard]
    });
  });

  it('should be created', inject([NonAuthGuard], (service: NonAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
