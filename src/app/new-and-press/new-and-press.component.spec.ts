import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAndPressComponent } from './new-and-press.component';

describe('NewAndPressComponent', () => {
  let component: NewAndPressComponent;
  let fixture: ComponentFixture<NewAndPressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAndPressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAndPressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
