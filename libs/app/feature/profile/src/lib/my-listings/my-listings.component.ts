import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NavbarService} from "@housemates/app/shared";

@Component({
  selector: 'housemates-my-listings',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.scss'],
})
export class MyListingsComponent implements OnInit {

  ngOnInit() {
    NavbarService.darkBackground.next(true);
  }
}
