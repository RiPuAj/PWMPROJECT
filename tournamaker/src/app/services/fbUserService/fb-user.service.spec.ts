import { TestBed } from '@angular/core/testing';

import { FbUserService } from './fb-user.service';

describe('FbUserService', () => {
  let service: FbUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
