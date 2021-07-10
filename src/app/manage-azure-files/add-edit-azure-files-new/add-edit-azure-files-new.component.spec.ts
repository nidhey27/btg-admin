import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAzureFilesNewComponent } from './add-edit-azure-files-new.component';

describe('AddEditAzureFilesNewComponent', () => {
  let component: AddEditAzureFilesNewComponent;
  let fixture: ComponentFixture<AddEditAzureFilesNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAzureFilesNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAzureFilesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
