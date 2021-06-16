import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesmonialsComponent } from './tesmonials.component';

describe('TesmonialsComponent', () => {
  let component: TesmonialsComponent;
  let fixture: ComponentFixture<TesmonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesmonialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesmonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
