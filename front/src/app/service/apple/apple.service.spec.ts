import { TestBed } from '@angular/core/testing';

import { AppleService } from './apple.service';

describe('AppleService', () => {
  let service: AppleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
