import { TestBed } from '@angular/core/testing';

import { FbTeamService } from './fb-team.service';

describe('FbTournamentService', () => {
  let service: FbTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
