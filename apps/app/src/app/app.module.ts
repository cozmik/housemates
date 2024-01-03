import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FooterComponent, NavbarComponent} from "@housemates/app/shared";
import {RouterModule, RouterOutlet} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from "@housemates/app/store";
import {InterceptorsProvider} from "@housemates/shared/interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NavbarComponent,
    RouterOutlet,
    StoreModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('@housemates/app/feature/home').then(m => m.HomeModule)
      },
      {
        path: 'listings',
        loadChildren: () => import('@housemates/listings').then(m => m.ListingsModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('@housemates/app/feature/profile').then(m => m.ProfileModule)
      },
    ]),
    FooterComponent,
    BrowserAnimationsModule],
  providers: [InterceptorsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
