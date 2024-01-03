import {Selector, State, StateContext} from '@ngxs/store';
import {ListingsModel} from "@housemates/shared/model";
import {EmitterAction, Receiver} from "@ngxs-labs/emitter";
import {ListingsService} from "./listings.service";
import {inject} from "@angular/core";
import {tap} from "rxjs";

export interface ListingsStateModel {
  data: ListingsModel[];
  selected?: ListingsModel;
  stats?: {
    active: number,
    inactive: number
  }
  loading?: boolean;
}

@State<ListingsStateModel>({
  name: 'listings',
  defaults: {
    data: []
  }
})
export class ListingsState {
  static service: ListingsService;

  @Selector()
  public static getState(state: ListingsStateModel) {
    return state;
  }

  @Selector()
  public static viewListingStats(state: ListingsStateModel) {
    return state.stats;
  }

  @Selector()
  public static getSelectedListing(state: ListingsStateModel) {
    return state.selected;
  }

  constructor() {
    ListingsState.service = inject(ListingsService);
  }

  @Receiver()
  static getListings(ctx: StateContext<ListingsStateModel>, {payload}: EmitterAction<any>) {
    ctx.patchState({loading: true});
    return this.service.getListing(payload).pipe(
      tap((res: any) => {
        ctx.setState({data: res, loading: false})
      })
    )
  }

  @Receiver()
  static postListing(ctx: StateContext<ListingsStateModel>, {payload}: EmitterAction<any>) {
    return this.service.createListing(payload).pipe(
      tap((res: any) => {
        console.log(res);
      })
    )
  }

  @Receiver()
  static getListingById(ctx: StateContext<ListingsStateModel>, {payload}: EmitterAction<string>) {
    return this.service.getListingById(payload).pipe(
      tap((res: any) => {
        ctx.patchState({selected: res.data})
      })
    )
  }

  @Receiver()
  static getListingStats(ctx: StateContext<ListingsStateModel>) {
    return this.service.getListingStats().pipe(
      tap((res: any) => {
        ctx.patchState({stats: res})
      })
    )
  }
}
