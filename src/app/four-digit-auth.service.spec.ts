import { TestBed } from '@angular/core/testing';

import { FourDigitAuthService } from './four-digit-auth.service';

describe('FourDigitAuthService', () => {
  let service: FourDigitAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FourDigitAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
