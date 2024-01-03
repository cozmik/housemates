import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@housemates/shared/environments";
import {map, of} from "rxjs";
import {AppConstants} from "@housemates/shared/utils";

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(private http: HttpClient) { }


  getListing(payload: any){
    return this.http.get(environment.apiUrl + 'listings?active=true').pipe(
      map(data => data)
    )
  }

  getListingById(id: string) {
    return this.http.get(`${environment.apiUrl}listings/${id}`).pipe(
      map(data => data)
    )
  }

  getListingStats() {
    return this.http.get(`${environment.apiUrl}listings/stats`, AppConstants.getTokenHttpHeaders()).pipe(
      map((res: any) => res.data)
    )
  }

  createListing(payload: any) {
    const data = this.getFormData(payload);
    return this.http.post(`${environment.apiUrl}listings`, data, AppConstants.getFormDataTokenHttpHeaders()).pipe(
      map((res: any) => res)
    )
  }

   private getFormData(object: Record<any, any>): FormData {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
      if (typeof object[key] !== 'object') formData.append(key, object[key])
      else formData.append(key, JSON.stringify(object[key]))
    })
    return formData;
  }
}
