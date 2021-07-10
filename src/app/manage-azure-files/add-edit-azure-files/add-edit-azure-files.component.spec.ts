import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAzureFilesComponent } from './add-edit-azure-files.component';

describe('AddEditAzureFilesComponent', () => {
  let component: AddEditAzureFilesComponent;
  let fixture: ComponentFixture<AddEditAzureFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAzureFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAzureFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
