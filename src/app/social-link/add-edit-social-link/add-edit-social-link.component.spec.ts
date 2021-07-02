import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSocialLinkComponent } from './add-edit-social-link.component';

describe('AddEditSocialLinkComponent', () => {
  let component: AddEditSocialLinkComponent;
  let fixture: ComponentFixture<AddEditSocialLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSocialLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSocialLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
