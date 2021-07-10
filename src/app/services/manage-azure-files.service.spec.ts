import { TestBed } from '@angular/core/testing';

import { ManageAzureFilesService } from './manage-azure-files.service';

describe('ManageAzureFilesService', () => {
  let service: ManageAzureFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageAzureFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
