import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarService} from "@housemates/app/shared";

@Component({
  selector: 'housemates-change-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  ngOnInit() {
    NavbarService.darkBackground.next(true);
  }}
