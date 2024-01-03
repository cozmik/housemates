import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarService} from "@housemates/app/shared";
import {NgIconComponent} from "@ng-icons/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {Emittable, Emitter, EmitterAction} from "@ngxs-labs/emitter";
import {ListingsState} from "@housemates/app/store";
import {ViewSelectSnapshot} from "@ngxs-labs/select-snapshot";

@Component({
  selector: 'housemates-frame',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterOutlet, RouterLink],
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
})
export class FrameComponent  implements OnInit {
  profileComplete = true;

  @Emitter(ListingsState.getListingStats) listingStatsAction!: Emittable;
  @ViewSelectSnapshot(ListingsState.viewListingStats) stats?: {active: number, inactive: number}

  ngOnInit() {
    NavbarService.darkBackground.next(true);
    this.listingStatsAction.emit();
  }
}
