import { TestBed } from '@angular/core/testing';

import { ContactBtgService } from './contact-btg.service';

describe('ContactBtgService', () => {
  let service: ContactBtgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactBtgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
