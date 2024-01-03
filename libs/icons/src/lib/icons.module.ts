import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgIconsModule} from "@ng-icons/core";
import {
  featherCheck, featherChevronLeft, featherChevronRight,
  featherFacebook, featherFilter,
  featherInstagram, featherLoader,
  featherMapPin,
  featherMenu, featherPlus,
  featherTwitter,
  featherX
} from "@ng-icons/feather-icons";
import {
  bootstrapCheck, bootstrapChevronRight, bootstrapExclamationCircleFill,
  bootstrapGeoAltFill, bootstrapHouseFill, bootstrapImageAlt, bootstrapPencilFill, bootstrapPersonFill, bootstrapPlus,
  bootstrapSendFill,
  bootstrapTelephoneFill,
  bootstrapX
} from "@ng-icons/bootstrap-icons";

const icons = {
  featherInstagram,
  featherFacebook,
  featherTwitter,
  featherMapPin,
  featherMenu,
  featherLoader,
  featherX,
  featherFilter,
  bootstrapImageAlt,
  featherChevronLeft,
  featherChevronRight,
  bootstrapPencilFill,
  bootstrapExclamationCircleFill,
  bootstrapHouseFill,
  bootstrapGeoAltFill,
  bootstrapCheck,
  bootstrapPlus,
  bootstrapPersonFill,
  featherPlus,
  bootstrapChevronRight,
  bootstrapTelephoneFill,
  bootstrapSendFill,
  featherCheck,
  bootstrapX,
}

@NgModule({
  imports: [
    CommonModule,
    NgIconsModule.withIcons(icons)
  ],
  exports: [
    NgIconsModule
  ]
})
export class IconsModule {}
