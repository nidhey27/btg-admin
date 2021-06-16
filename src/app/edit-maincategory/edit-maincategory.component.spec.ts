import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaincategoryComponent } from './edit-maincategory.component';

describe('EditMaincategoryComponent', () => {
  let component: EditMaincategoryComponent;
  let fixture: ComponentFixture<EditMaincategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMaincategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMaincategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
