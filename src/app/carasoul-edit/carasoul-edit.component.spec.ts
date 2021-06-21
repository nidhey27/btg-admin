import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarasoulEditComponent } from './carasoul-edit.component';

describe('CarasoulEditComponent', () => {
  let component: CarasoulEditComponent;
  let fixture: ComponentFixture<CarasoulEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarasoulEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarasoulEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
