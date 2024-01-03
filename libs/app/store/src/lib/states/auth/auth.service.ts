import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@housemates/shared/environments";
import {map} from "rxjs";
import {AppConstants} from "@housemates/shared/utils";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(payload: {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    ageRange: string,
    password: string}) {
    return this.http.post(`${environment.apiUrl}auth/register`, payload, AppConstants.getNoTokenHeaders()).pipe(
      map(res => res)
    )
  }

  login(payload: { email: string; password: string }) {
    return this.http.post(environment.apiUrl + 'auth/login', payload, AppConstants.getNoTokenHeaders()).pipe(
      map(res => res)
    )
  }

  updateProfile(payload: any) {
    return this.http.put(`${environment.apiUrl}auth/profile`, payload, AppConstants.getTokenHttpHeaders()).pipe(
      map((res: any) => res.data)
    )
  }
}
