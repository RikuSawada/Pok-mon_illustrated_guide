import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideServiceWorker} from '@angular/service-worker';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideNgxStripe} from "ngx-stripe";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  }), provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  }), provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  }), provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  }), provideAnimations(), provideNgxStripe('pk_test_51P0vN1CXrocY14EX1K5pnTGK0ANHSWztFEEuKMVmvaaF39gEuLjfDHPGwxwgpmahuxt2J5DOoguESJUfRogUhAJ400RKcUCBAJ')]
};
