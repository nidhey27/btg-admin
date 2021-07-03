import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstrumentModalComponent } from './add-instrument-modal.component';

describe('AddInstrumentModalComponent', () => {
  let component: AddInstrumentModalComponent;
  let fixture: ComponentFixture<AddInstrumentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInstrumentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstrumentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
