import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgIconComponent} from "@ng-icons/core";
import {UtilityService} from "../utility-service/utility.service";
import {NgStringPipesModule} from "ngx-pipes";

@Component({
  selector: 'housemates-image-uploader',
  standalone: true,
  imports: [CommonModule, NgIconComponent, NgStringPipesModule],
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent {
  filesArr: Array<{name: string, file: string | any}> = [];
  @Output() files = new EventEmitter();

  constructor(private utilityService: UtilityService) {
  }

  async addFile(target: any, base64 = true) {
    const file = target.files[0];
    if(base64) {
      this.filesArr.push({name: file.name, file: await this.utilityService.getBase64(file)});
    } else {
      this.filesArr.push({name: file.name, file});
    }
    this.files.emit(this.filesArr);
  }
  deleteImage(i: number) {
    this.filesArr.splice(i, 1);
  }
}
