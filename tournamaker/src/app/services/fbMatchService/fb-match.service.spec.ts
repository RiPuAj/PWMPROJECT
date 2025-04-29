import { TestBed } from '@angular/core/testing';

import { FbMatchService } from './fb-match.service';

describe('FbMatchService', () => {
  let service: FbMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
