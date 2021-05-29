import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSubCatagoryComponent } from './get-sub-catagory.component';

describe('GetSubCatagoryComponent', () => {
  let component: GetSubCatagoryComponent;
  let fixture: ComponentFixture<GetSubCatagoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSubCatagoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSubCatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
