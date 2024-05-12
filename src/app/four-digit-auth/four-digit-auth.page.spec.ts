import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FourDigitAuthPage } from './four-digit-auth.page';

describe('FourDigitAuthPage', () => {
  let component: FourDigitAuthPage;
  let fixture: ComponentFixture<FourDigitAuthPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FourDigitAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
