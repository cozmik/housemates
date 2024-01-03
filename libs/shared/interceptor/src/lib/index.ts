import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Auth} from './auth.interceptor.service';
import {ErrorHandler} from './error-handler.interceptor.service';

export const InterceptorsProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: Auth, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorHandler, multi: true },
];
