import {ListingsComponent} from "./listings/listings.component";
import {ViewListingComponent} from "./view-listing/view-listing.component";
import {Route} from "@angular/router";

export const listingsRoutes: Route[] = [
  {
    path: '', pathMatch: 'full', component: ListingsComponent
  },
  {
    path: ':id',
    component: ViewListingComponent
  }
];
