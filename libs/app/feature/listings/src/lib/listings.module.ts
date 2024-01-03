import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterModule } from '@angular/router';
import { listingsRoutes } from './lib.routes';
import { ListingsComponent } from './listings/listings.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import {MatSelectModule} from "@angular/material/select";
import {IconsModule} from "@housemates/icons";
import {ListingComponent} from "../../../../shared/src";
import {NgIconComponent} from "@ng-icons/core";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, RouterModule.forChild(listingsRoutes),
        IconsModule, MatSelectModule, ListingComponent,
        ListingComponent, ListingComponent, NgOptimizedImage, NgIconComponent, FormsModule],
  declarations: [ListingsComponent, ViewListingComponent],
  exports: [ListingsComponent, ViewListingComponent],
})
export class ListingsModule {}
