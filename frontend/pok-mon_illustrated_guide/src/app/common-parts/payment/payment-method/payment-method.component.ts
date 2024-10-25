// payment.component.ts
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {environment} from "../../../../env/environment";
import {NgIf} from "@angular/common";
import {StripeCardComponent} from "ngx-stripe";
import {loadStripe} from "@stripe/stripe-js";

declare var Stripe: any;

interface StripeCardEvent {
  error?: {
    message: string;
  };
}

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  standalone: true,
  imports: [
    NgIf,
    StripeCardComponent
  ],
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  stripe: any; // Stripe object
  card: any; // Element for card details

  @Output() paymentMethodId = new EventEmitter<string>();

  constructor() {
  }

  async ngOnInit() {
    this.stripe = await loadStripe(environment.stripePublicKey);
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  async handlePayment() {
    const {paymentMethod, error} = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card
    });

    if (error) {
      console.log('Error:', error);
    } else {
      console.log('PaymentMethod:', paymentMethod.id);
      this.paymentMethodId.emit(paymentMethod.id);
    }
  }


}
