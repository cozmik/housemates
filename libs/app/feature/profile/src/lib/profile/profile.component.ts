import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatSelectModule} from "@angular/material/select";
import {IconsModule} from "@housemates/icons";
import {ViewSelectSnapshot} from "@ngxs-labs/select-snapshot";
import {AuthStateModule, ListingsState, UtilityState} from "@housemates/app/store";
import {ListingsModel, StateModel, UserModel} from "@housemates/shared/model";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AgeRange} from "@housemates/shared/utils";
import {Emittable, Emitter} from "@ngxs-labs/emitter";

@Component({
  selector: 'housemates-profile',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatSelectModule, IconsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  @ViewSelectSnapshot(ListingsState.getListingById) listings?: ListingsModel[];
  @ViewSelectSnapshot(UtilityState.getStates) states?: StateModel[];
  @Emitter(AuthStateModule.updateUser) updateUserAction!: Emittable<any>
  ageRange = AgeRange;
  @ViewSelectSnapshot(AuthStateModule.getProfile) profile!: UserModel;
  edit = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      ageRange: [''],
      smoke: [''],
      sex: [''],
      profession: [''],
      about: [''],
      hobbies: [''],
      userProfile: ['']
    })
  }

  ngOnInit(): void {
    const {
      firstName, lastName, email,
      phoneNumber,
      ageRange,
      smoke,
      sex,
      profession,
      about,
      hobbies,
      userProfile
    } = this.profile
    this.userForm.patchValue({
      firstName,
      lastName,
      email, phoneNumber, ageRange, smoke, sex, profession, about, hobbies: hobbies?.join(", "), userProfile
    })
  }

  updateUser() {
    const {hobbies} = this.userForm.value;
    this.userForm.value['hobbies'] = hobbies.split(',').map((d: string) => {
      return d.trimStart();
    });
    this.updateUserAction.emit(this.userForm.value).subscribe(() => {
      this.edit = false;
    });
  }

  getBase64Format(event: any): any {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.userForm.controls['profileImage'].patchValue(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}
