import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTeamsComponent } from './add-edit-teams.component';

describe('AddEditTeamsComponent', () => {
  let component: AddEditTeamsComponent;
  let fixture: ComponentFixture<AddEditTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
