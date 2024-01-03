import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {StateModel} from "@housemates/shared/model";
import {environment} from "@housemates/shared/environments";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  http = inject(HttpClient);

  getStates(): Observable<StateModel[]>{
    return this.http.get(`${environment.apiUrl}states`).pipe(
      map((res: any) => res)
    )
  }

  getLgas(stateId: string): Observable<string[]>{
    return this.http.get<string[]>(`${environment.apiUrl}states/${stateId}`).pipe(
      map(res => res)
    )
  }
}
