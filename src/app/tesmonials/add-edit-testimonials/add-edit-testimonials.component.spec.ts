import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTestimonialsComponent } from './add-edit-testimonials.component';

describe('AddEditTestimonialsComponent', () => {
  let component: AddEditTestimonialsComponent;
  let fixture: ComponentFixture<AddEditTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTestimonialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
