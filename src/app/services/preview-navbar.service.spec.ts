import { TestBed } from '@angular/core/testing';

import { PreviewNavbarService } from './preview-navbar.service';

describe('PreviewNavbarService', () => {
  let service: PreviewNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewNavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
