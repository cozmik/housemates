import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IconsModule} from "@housemates/icons";
import {ListingsModel} from "@housemates/shared/model";

@Component({
  selector: 'housemates-listing',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent {
  @Input() data!: ListingsModel;
}
