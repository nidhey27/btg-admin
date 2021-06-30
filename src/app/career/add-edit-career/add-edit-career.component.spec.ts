import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCareerComponent } from './add-edit-career.component';

describe('AddEditCareerComponent', () => {
  let component: AddEditCareerComponent;
  let fixture: ComponentFixture<AddEditCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCareerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
