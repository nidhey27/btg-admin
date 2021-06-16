import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactusComponent } from './edit-contactus.component';

describe('EditContactusComponent', () => {
  let component: EditContactusComponent;
  let fixture: ComponentFixture<EditContactusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContactusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
