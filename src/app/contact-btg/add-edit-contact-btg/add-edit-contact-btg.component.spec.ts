import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditContactBtgComponent } from './add-edit-contact-btg.component';

describe('AddEditContactBtgComponent', () => {
  let component: AddEditContactBtgComponent;
  let fixture: ComponentFixture<AddEditContactBtgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditContactBtgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditContactBtgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
