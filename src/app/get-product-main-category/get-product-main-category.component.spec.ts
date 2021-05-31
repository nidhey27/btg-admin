import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProductMainCategoryComponent } from './get-product-main-category.component';

describe('GetProductMainCategoryComponent', () => {
  let component: GetProductMainCategoryComponent;
  let fixture: ComponentFixture<GetProductMainCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetProductMainCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetProductMainCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
