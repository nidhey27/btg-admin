import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAzureFilesComponent } from './manage-azure-files.component';

describe('ManageAzureFilesComponent', () => {
  let component: ManageAzureFilesComponent;
  let fixture: ComponentFixture<ManageAzureFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAzureFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAzureFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
