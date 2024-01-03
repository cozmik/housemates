import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgIconComponent} from "@ng-icons/core";

@Component({
  selector: 'housemates-footer',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
}
