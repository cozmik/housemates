import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { profileRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(profileRoutes)],
})
export class ProfileModule {}
