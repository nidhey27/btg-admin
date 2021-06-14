import { TestBed } from '@angular/core/testing';

import { SolutionMainCategoryService } from './solution-main-category.service';

describe('SolutionMainCategoryService', () => {
  let service: SolutionMainCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionMainCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
