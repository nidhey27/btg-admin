import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAboutDefaultComponent } from './add-edit-about-default.component';

describe('AddEditAboutDefaultComponent', () => {
  let component: AddEditAboutDefaultComponent;
  let fixture: ComponentFixture<AddEditAboutDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAboutDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAboutDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
