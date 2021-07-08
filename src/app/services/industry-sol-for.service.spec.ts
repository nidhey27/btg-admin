import { TestBed } from '@angular/core/testing';

import { IndustrySolForService } from './industry-sol-for.service';

describe('IndustrySolForService', () => {
  let service: IndustrySolForService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndustrySolForService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
