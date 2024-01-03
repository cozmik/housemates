import {Observable, switchMap, throwError} from 'rxjs';
import {incrementalRetry} from './incremental-retry';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, retryWhen} from 'rxjs/operators';
import {Emittable, Emitter} from "@ngxs-labs/emitter";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {Auth} from "./auth.interceptor.service";
import {Router} from "@angular/router";
import {AuthStateModule} from "@housemates/app/store";

@Injectable({
  providedIn: 'root'
})

export class ErrorHandler implements HttpInterceptor {

  @Emitter(AuthStateModule.logout)
  private logoutAction!: Emittable;

  // @Emitter(AuthStateModule.getNewToken) private getNewTokenAction!: Emittable

  @SelectSnapshot(AuthStateModule.getToken) private readonly tokens!: { token: string, refreshToken: string }

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let errorMessage;
    return next.handle(request).pipe(
      retryWhen(incrementalRetry({
        scalingDuration: 2000,
        excludedStatusCodes: [500, 503, 401],
        request: request,
        headerAllow: request.headers.get('retry') as string | undefined
      })),
      catchError((err: HttpErrorResponse | any) => {
        if (err.error instanceof ErrorEvent) {
          errorMessage = `Error: ${err.error.message}`;
        } else {
          if (err.error instanceof ErrorEvent) {
            errorMessage = `Error: ${err.error.message}`;
          } else {
            if (err.status === 404) {
              console.error('Url not found', err);
            } else if ((err.status === 0 && err.statusText !== 'Unknown Error') || (err.status >= 500)) {
              console.log('got to server');
              // this.router.navigate(['server-error'], {skipLocationChange: true});
            } else if (err.status === 401) {
              // this.logout.emit();
              // ******************Refresh token expired here********************************************************
              if (err.url.indexOf('refreshToken') > -1) {
                this.logoutAction.emit();
              }
              // else {
              //   console.log('should refresh')
                // ***************************************Refresh token section here********************************************
                // return this.getNewTokenAction.emit().pipe(
                //   switchMap(() => {
                //     console.log(request);
                //     return next.handle(Auth.addAuthenticationToken(request, this.tokens.token));
                //   }),
                  // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                  // for the next time the token needs to be refreshed
                  // finalize(() => AuthService.refreshTokenInProgress = false)
                // );
              }
            }
          }
          // console.log(this.requestQueue);
          // }
        // }

        let error = '';
        if (err.error.errors) {
          error = err.error.errors.message || err.statusText;
        } else {
          error = err.error;
        }
        if (request.headers.get('popup-error') === 'true') {
          // alert('Error here');
          // ResponseService.handleGeneralApiError(error);
        }
        // console.log(error);
        return throwError(error);
      }));
  }
}

