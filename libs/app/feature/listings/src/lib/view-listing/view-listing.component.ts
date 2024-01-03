import {Component, OnInit} from '@angular/core';
import {NavbarService} from "@housemates/app/shared";
import {ViewSelectSnapshot} from "@ngxs-labs/select-snapshot";
import {ListingsState} from "@housemates/app/store";
import {ListingsModel} from "@housemates/shared/model";
import {Emittable, Emitter} from "@ngxs-labs/emitter";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'housemates-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrls: ['./view-listing.component.scss'],
})
export class ViewListingComponent implements OnInit{
  @ViewSelectSnapshot(ListingsState.getSelectedListing) listing?: ListingsModel;
  @Emitter(ListingsState.getListingById) getListingAction!: Emittable<string>;

  constructor(private ar: ActivatedRoute) {
  }
  ngOnInit() {
    NavbarService.darkBackground.next(true);
    this.getListingAction.emit(this.ar.snapshot.params['id']);
  }
}
