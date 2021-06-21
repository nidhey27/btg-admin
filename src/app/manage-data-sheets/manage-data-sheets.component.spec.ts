import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDataSheetsComponent } from './manage-data-sheets.component';

describe('ManageDataSheetsComponent', () => {
  let component: ManageDataSheetsComponent;
  let fixture: ComponentFixture<ManageDataSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDataSheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDataSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
