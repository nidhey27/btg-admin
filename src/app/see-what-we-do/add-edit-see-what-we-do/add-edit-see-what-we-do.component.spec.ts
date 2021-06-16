import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSeeWhatWeDoComponent } from './add-edit-see-what-we-do.component';

describe('AddEditSeeWhatWeDoComponent', () => {
  let component: AddEditSeeWhatWeDoComponent;
  let fixture: ComponentFixture<AddEditSeeWhatWeDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSeeWhatWeDoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSeeWhatWeDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
