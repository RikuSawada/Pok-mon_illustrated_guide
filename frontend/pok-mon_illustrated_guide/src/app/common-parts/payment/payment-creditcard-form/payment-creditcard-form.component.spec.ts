import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PaymentCreditcardFormComponent} from './payment-creditcard-form.component';

describe('PaymentCreditcardFormComponent', () => {
  let component: PaymentCreditcardFormComponent;
  let fixture: ComponentFixture<PaymentCreditcardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCreditcardFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCreditcardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
