import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {BehaviorSubject, catchError, firstValueFrom, map, mergeMap, Observable, timer} from "rxjs";

@Injectable()
export class StateService {
  states = new BehaviorSubject<Array<{id: string, name: string}>>([]);

  constructor(private http: HttpService) {
    this.getStates().subscribe()
  }

  getStates() {
    return timer(0, 60 * 60 * 24 * 7).pipe(
      mergeMap(() => this.http.get('https://api.facts.ng/v1/states')),
      map((d: any) => {
        if (d.data) {
          this.states.next(d.data.map(s => {
            return {id: s.id, name: s.name}
          }));
        }
      })
    )
  }

  async getLGA(stateId: string):  Promise<string[]> {
    const {data} = await firstValueFrom(
     this.http.get('https://api.facts.ng/v1/states/' + stateId).pipe(
       catchError((error: any) => {
         console.error(error.response.data);
         throw error.response.data;
       }),
     ),
    );
    return data.lgas;
  }
}
