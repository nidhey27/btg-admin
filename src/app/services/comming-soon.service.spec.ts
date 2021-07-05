import { TestBed } from '@angular/core/testing';

import { CommingSoonService } from './comming-soon.service';

describe('CommingSoonService', () => {
  let service: CommingSoonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommingSoonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
