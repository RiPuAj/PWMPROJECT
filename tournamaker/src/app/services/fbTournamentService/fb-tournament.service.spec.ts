import { TestBed } from '@angular/core/testing';

import { FbTournamentService } from './fb-tournament.service';

describe('FbMatchService', () => {
  let service: FbTournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbTournamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
