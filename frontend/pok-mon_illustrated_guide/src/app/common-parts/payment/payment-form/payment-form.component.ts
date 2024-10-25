import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {
  VirtualEmployeeApiService
} from "../../../../infra/VirtualEmployeeApi/VirtualEmployeeApiService";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {PaymentUserInfoDto} from "../../../../util/WebDTO/payment/PaymentUserInfoDto";

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    HttpClientModule,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent implements OnInit {

  @Input() productId: string | undefined;
  @Input() amount: number | undefined;

  useRegisteredNameForm: FormGroup;
  useRegisteredAddressForm: FormGroup;

  nameForm: FormGroup;
  addressForm: FormGroup;

  paymentMethodForm: FormGroup;

  @Output() formDataEvent = new EventEmitter<PaymentUserInfoDto>();

  constructor(private fb: FormBuilder,
              private readonly virtualEmployeeApiService: VirtualEmployeeApiService,
              private router: Router) {
    this.useRegisteredNameForm = new FormGroup({
      option: new FormControl('0'), // Default selection
    });

    this.useRegisteredAddressForm = new FormGroup({
      option: new FormControl('0'), // Default selection
    });

    this.paymentMethodForm = new FormGroup({
      paymentMethod: new FormControl('1'),
    });

    this.nameForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.addressForm = this.fb.group({
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{7}$')]],
      prefecture: ['', Validators.required],
      city: ['', Validators.required],
      townAndStreet: ['', Validators.required],
      buildingName: [''], // 任意
    });

  }

  ngOnInit(): void {
    if (this.productId && this.amount) {
      // @Todo エラーメッセージの表示
    }
  }

  onSubmit() {
    console.log(this.productId, this.amount);
    if (this.productId && this.amount) {
      let params: PaymentUserInfoDto = new PaymentUserInfoDto(
        this.paymentMethodForm.value.paymentMethod,
        this.productId,
        this.useRegisteredNameForm.value.option === '1' ? this.nameForm.value.firstName : '',
        this.useRegisteredNameForm.value.option === '1' ? this.nameForm.value.lastName : '',
        this.useRegisteredAddressForm.value.option === '1' ? this.nameForm.value.postalCode : '',
        this.useRegisteredAddressForm.value.option === '1' ? this.nameForm.value.prefecture : '',
        this.useRegisteredAddressForm.value.option === '1' ? this.nameForm.value.city : '',
        this.useRegisteredAddressForm.value.option === '1' ? this.nameForm.value.townAndStreet : '',
        this.amount
      );
      this.formDataEvent.emit(params);
    }
  }
}
