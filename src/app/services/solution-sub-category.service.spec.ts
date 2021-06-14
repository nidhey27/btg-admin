import { TestBed } from '@angular/core/testing';

import { SolutionSubCategoryService } from './solution-sub-category.service';

describe('SolutionSubCategoryService', () => {
  let service: SolutionSubCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionSubCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
