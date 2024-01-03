import {Component, HostBinding, inject, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AuthenticationComponent} from "../modals/authentication/authentication.component";
import {IconsModule} from "@housemates/icons";
import {NavbarService} from "./navbar.service";
import {tap} from "rxjs";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {ViewSelectSnapshot} from "@ngxs-labs/select-snapshot";
import {AuthStateModule} from "@housemates/app/store";
import {UserModel} from "@housemates/shared/model";

@Component({
  selector: 'housemates-navbar',
  standalone: true,
  imports: [CommonModule, IconsModule, MatDialogModule, NgOptimizedImage, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  open = false;
  opacity = 0;
  bgColor = `rgba(48,48,48,${this.opacity})`;
  @HostBinding() @Input('class') classList = '';
  @ViewSelectSnapshot(AuthStateModule.isLoggedIn) loggedIn?: boolean;
  @ViewSelectSnapshot(AuthStateModule.getProfile) profile?: UserModel;
  year = new Date().getFullYear();
  router = inject(Router);

  constructor(private dialog: MatDialog) {
    NavbarService.darkBackground.asObservable().pipe(
      tap(res => {
        if (res) {
          this.opacity = 1
          this.bgColor = `rgba(48,48,48,${this.opacity})`;
        } else {
          this.opacity = 0;
        }
      })
    ).subscribe();

    this.router.events.pipe(
      tap(e => {
        if(e instanceof NavigationEnd){
          this.open = false;
        }
      })
    ).subscribe();
  }


  onWindowScroll($event: any) {
    if (!NavbarService.darkBackground.getValue()) {
      const opacity = scrollY / 200 < 1 ? scrollY / 200 : 1;
      this.bgColor = 'rgba(48,48,48,' + opacity + ')';
    }
  }

  openAuthModal() {
    const modal = this.dialog.open(AuthenticationComponent, {
      width: '550px',
      maxHeight: '95vh',
      maxWidth: '95vw',
    }).afterOpened().subscribe(() => {
      this.open = false;
    })
  }
}
