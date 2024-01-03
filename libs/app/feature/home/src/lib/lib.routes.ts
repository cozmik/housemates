import { Route } from '@angular/router';
import {HomeComponent} from "./home/home.component";

export const homeRoutes: Route[] = [
   {path: '', pathMatch: 'full', component: HomeComponent}
];
