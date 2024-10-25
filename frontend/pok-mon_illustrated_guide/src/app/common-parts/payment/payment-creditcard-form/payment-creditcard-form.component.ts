import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {StripePaymentElementComponent, StripeService} from "ngx-stripe";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../../../../env/environment";
import {loadStripe, StripeCardElement, StripeCardElementOptions} from "@stripe/stripe-js";
import {
  VirtualEmployeeApiService
} from "../../../../infra/VirtualEmployeeApi/VirtualEmployeeApiService";
import {
  PaymentCreateRequestParams
} from "../../../../infra/VirtualEmployeeApi/Params/PaymentCreateRequestParams";
import {PaymentUserInfoDto} from "../../../../util/WebDTO/payment/PaymentUserInfoDto";
import {CookieServiceWrapper} from "../../../../util/Service/Data/CookieServiceWrapper";

@Component({
  selector: 'app-payment-creditcard-form',
  standalone: true,
  imports: [
    HttpClientModule,
    StripePaymentElementComponent,
    NgIf,
    FormsModule,

  ],
  templateUrl: './payment-creditcard-form.component.html',
  styleUrl: './payment-creditcard-form.component.css'
})
export class PaymentCreditcardFormComponent implements OnInit {
  @Input() paymentUserInfoDto: PaymentUserInfoDto | undefined;

  @Output() formDataEvent = new EventEmitter<string | undefined>();

  @ViewChild(StripePaymentElementComponent) paymentElement?: StripePaymentElementComponent

  publicKey: string = environment.stripePublicKey;

  stripePromise = loadStripe(this.publicKey);

  currency: string = 'jpy';

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
      },
    },
  };

  card: StripeCardElement | undefined; // Stripe Card Elementを格納

  clientSecret: string = '';

  private id: string | undefined;

  constructor(private readonly stripeService: StripeService,
              private readonly virtualEmployeeApiService: VirtualEmployeeApiService,
              private cookie: CookieServiceWrapper) {
  }

  ngOnInit(): void {
    this.initializeStripe().then();
    console.log(this.paymentUserInfoDto);
    this.createPaymentIntent().then();
  }

  private async createPaymentIntent() {
    if (this.paymentUserInfoDto) {
      let params = new PaymentCreateRequestParams(this.cookie.getUserId(), this.paymentUserInfoDto, this.currency);
      this.virtualEmployeeApiService.post('/payment/create', params).subscribe({
        next: (res) => {
          this.clientSecret = res.clientSecret;
          this.id = res.id;
          console.log(res);
        },
        error: (error) => {
          console.error('Error:', error.message);
          this.formDataEvent.emit(undefined);
        }
      });
    } else {
      console.error('金額がセットされていません。');
      this.formDataEvent.emit(undefined);
    }
  }

  async initializeStripe() {
    const stripe = await this.stripePromise;
    if (stripe) {
      console.log(stripe);
      const elements = stripe.elements();
      console.log(elements);

      this.card = elements.create('card', this.cardOptions);
      this.card.mount('#card-element');
      console.log(this.card);

    }
  }

  async pay() {
    if (!this.paymentElement) return;
    this.stripeService.confirmPayment({
      elements: this.paymentElement.elements,
      redirect: 'if_required',
    }).subscribe(result => {
      console.log('Result', result);
      if (result.error) {
        this.formDataEvent.emit(undefined);
      } else {
        if (result.paymentIntent?.status === 'succeeded') {
          this.formDataEvent.emit(this.id);
        }
      }
    });
  }
}
