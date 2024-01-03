import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './lib.routes';
import { HomeComponent } from './home/home.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgIconComponent} from "@ng-icons/core";
import {MatSelectModule} from "@angular/material/select";
import {CdkListboxModule} from "@angular/cdk/listbox";

@NgModule({
  imports: [CommonModule,
    CommonModule, FontAwesomeModule, NgIconComponent, MatSelectModule, CdkListboxModule,
    RouterModule.forChild(homeRoutes)],
  declarations: [HomeComponent],
})
export class HomeModule {}
