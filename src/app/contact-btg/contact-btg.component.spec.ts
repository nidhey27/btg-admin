import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactBtgComponent } from './contact-btg.component';

describe('ContactBtgComponent', () => {
  let component: ContactBtgComponent;
  let fixture: ComponentFixture<ContactBtgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactBtgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactBtgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
