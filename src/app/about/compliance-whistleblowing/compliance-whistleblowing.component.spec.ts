import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceWhistleblowingComponent } from './compliance-whistleblowing.component';

describe('ComplianceWhistleblowingComponent', () => {
  let component: ComplianceWhistleblowingComponent;
  let fixture: ComponentFixture<ComplianceWhistleblowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceWhistleblowingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceWhistleblowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
