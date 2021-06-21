import { TestBed } from '@angular/core/testing';

import { RemovewhitespacesService } from './removewhitespaces.service';

describe('RemovewhitespacesService', () => {
  let service: RemovewhitespacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemovewhitespacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
