import {Component, inject, OnInit} from '@angular/core';
import {NavbarService} from "@housemates/app/shared";
import {ViewSelectSnapshot} from "@ngxs-labs/select-snapshot";
import {UtilityService, UtilityState} from "@housemates/app/store";
import {StateModel} from "@housemates/shared/model";
import {Observable, of, startWith} from "rxjs";
import {Router} from "@angular/router";
import {ListingsState, ListingsStateModel} from "@housemates/app/store";
import {Emittable, Emitter} from "@ngxs-labs/emitter";

@Component({
  selector: 'housemates-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss'],
})
export class ListingsComponent implements OnInit{
  router = inject(Router);
  @ViewSelectSnapshot(ListingsState) listings?: ListingsStateModel;
  @Emitter(ListingsState.getListings) getListingsAction!: Emittable;
  utilityService = inject(UtilityService);
  @ViewSelectSnapshot(UtilityState.getStates) states?: StateModel[];
  lgas: Observable<string[]> = of([]);
  selectedState: any;
  getLga(stateId: any) {
    this.lgas = this.utilityService.getLgas(stateId).pipe(
      startWith([])
    )
  }
  ngOnInit() {
    NavbarService.darkBackground.next(true);
    this.getListingsAction.emit();
  }
}
