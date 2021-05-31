import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProMainCatEditComponent } from './pro-main-cat-edit.component';

describe('ProMainCatEditComponent', () => {
  let component: ProMainCatEditComponent;
  let fixture: ComponentFixture<ProMainCatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProMainCatEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProMainCatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
