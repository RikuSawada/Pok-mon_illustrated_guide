import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {TopComponent} from "./components/top/top.component";
import {ChatComponent} from "./chat/chat.component";
import {UserSettingComponent} from "./user-setting/user-setting/user-setting.component";
import {SignUpIndexComponent} from "./sign-up/sign-up-index/sign-up-index.component";
import {
  SignUpProvisionalRegistrationComponent
} from "./sign-up/sign-up-provisional-registration/sign-up-provisional-registration.component";
import {SignUpCompleteComponent} from "./sign-up/sign-up-complete/sign-up-complete.component";
import {
  UserInfoInquiryComponent
} from "./user-setting/user-info-inquiry/user-info-inquiry.component";
import {
  UserPasswordUpdateComponent
} from "./user-setting/user-password-update/user-password-update.component";
import {
  UserEmailUpdateComponent
} from "./user-setting/user-email-update/user-email-update.component";
import {
  UserAddressUpdateComponent
} from "./user-setting/user-address-update/user-address-update.component";
import {SubscriptionListComponent} from "./product/subscription-list/subscription-list.component";
import {SubscriptionInfoComponent} from "./product/subscription-info/subscription-info.component";
import {
  SubscriptionPaymentComponent
} from "./product/subscription-payment/subscription-payment.component";
import {
  SubscriptionPaymentCompleteComponent
} from "./product/subscription-payment-complete/subscription-payment-complete.component";
import {
  SubscriptionPaymentSettingComponent
} from "./product/subscription-payment-setting/subscription-payment-setting.component";
import {SelectPromptComponent} from "./select-prompt/select-prompt.component";
import {PaymentHistoryComponent} from "./payment/payment-history/payment-history.component";
import {
  PaymentMethodSettingComponent
} from "./payment/payment-method-setting/payment-method-setting.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {authGuard} from "../util/Guard/auth.guard";


export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'signup', component: SignUpIndexComponent},
  {path: 'signup-provisional', component: SignUpProvisionalRegistrationComponent},
  {path: 'signup-complete', component: SignUpCompleteComponent},
  {path: 'top', component: TopComponent,canActivate: [authGuard]},
  {path: 'chat', component: ChatComponent,canActivate: [authGuard]},
  {path: 'user-setting', component: UserSettingComponent,canActivate: [authGuard]},
  {path: 'user-info-inquiry', component: UserInfoInquiryComponent,canActivate: [authGuard]},
  {path: 'user-email-update', component: UserEmailUpdateComponent,canActivate: [authGuard]},
  {path: 'user-address-update', component: UserAddressUpdateComponent,canActivate: [authGuard]},
  {path: 'user-password-update', component: UserPasswordUpdateComponent,canActivate: [authGuard]},
  {path: 'subscription-list', component: SubscriptionListComponent,canActivate: [authGuard]},
  {path: 'subscription-info', component: SubscriptionInfoComponent,canActivate: [authGuard]},
  {path: 'subscription-payment-setting', component: SubscriptionPaymentSettingComponent,canActivate: [authGuard]},
  {path: 'subscription-payment', component: SubscriptionPaymentComponent,canActivate: [authGuard]},
  {path: 'subscription-payment-complete', component: SubscriptionPaymentCompleteComponent,canActivate: [authGuard]},
  {path: 'select-prompt', component: SelectPromptComponent,canActivate: [authGuard]},
  {path: 'payment-history', component: PaymentHistoryComponent,canActivate: [authGuard]},
  {path: 'payment-method-setting', component: PaymentMethodSettingComponent,canActivate: [authGuard]},
  {path: 'error-page', component: ErrorPageComponent,canActivate: [authGuard]}
];
