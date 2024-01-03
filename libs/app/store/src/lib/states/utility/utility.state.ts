import {State, Selector, StateContext, NgxsAfterBootstrap} from '@ngxs/store';
import {Emittable, Emitter, Receiver} from "@ngxs-labs/emitter";
import {inject} from "@angular/core";
import {UtilityService} from "./utility.service";
import {tap} from "rxjs";
import {StateModel} from "@housemates/shared/model";

export interface UtilityStateModel {
  items: Record<string, any[]>;
}

@State<UtilityStateModel>({
  name: 'utility'
})
export class UtilityState implements NgxsAfterBootstrap{
  private static service: UtilityService;
  @Emitter(UtilityState.getLocationStates) private getStatesActions!: Emittable;

  @Selector()
  public static getState(state: UtilityStateModel) {
    return state;
  }

  @Selector()
  public static getStates(state: UtilityStateModel): StateModel[] | null {
    return state.items['states']
  }

  constructor() {
    UtilityState.service = inject(UtilityService);
  }

  @Receiver()
  static getLocationStates(ctx: StateContext<UtilityStateModel>) {
      return this.service.getStates().pipe(
        tap((res: StateModel[]) => {
          const data = {states: res}
          ctx.patchState({items: data})
        })
      )
  }

  ngxsAfterBootstrap(ctx: StateContext<any>): void {
    this.getStatesActions.emit();
  }
}
