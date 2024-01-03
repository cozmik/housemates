import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {AuthStateModule} from "@housemates/app/store";

@Injectable({
  providedIn: 'root'
})
export class Auth implements HttpInterceptor {

  static addAuthenticationToken(req: HttpRequest<any>, token: string, type?: string): HttpRequest<any> {
    if(!type || type === 'token') {
      return req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    } else {
      return req.clone({
        headers: req.headers.set('Refresh-Token', `${token}`),
      });
    }
  }

  constructor(private store: Store) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authToken;
    console.log(req);
    if (!(req.headers.get('No-auth')) || ((req.headers.get('No-auth') === 'true') && (req.headers.get('TokenRefresh') === 'false'))) {
      console.log(req);
      return next.handle(req.clone());
    } else {
      let authReq = req.clone();
      if (req.headers.get('No-auth') === 'false' && req.headers.get('TokenRefresh') === 'false') {
        authToken = this.store.selectSnapshot(AuthStateModule.getToken);
        if(authToken)
        authReq = Auth.addAuthenticationToken(req, authToken);
      }
      // else if (req.headers.get('TokenRefresh') === 'true') {
      //   authToken = this.store.selectSnapshot(AuthStateModule.getToken);
      //   console.log(authToken);
      //   if(authToken)
      //   authReq = Auth.addAuthenticationToken(req, authToken.refreshToken, 'refresh-token');
      // }
      // Get the auth token from the service.

      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }
  }
}
