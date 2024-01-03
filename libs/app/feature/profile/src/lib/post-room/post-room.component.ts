import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {AgeRange} from "@housemates/shared/utils";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {ImageUploaderComponent, UtilityService} from "@housemates/app/shared";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ListingsState, UtilityService as storeUtilityService} from "@housemates/app/store";
import {ViewSelectSnapshot} from "@ngxs-labs/select-snapshot";
import {UtilityState} from "@housemates/app/store";
import {ListingsModel, StateModel} from "@housemates/shared/model";
import {distinctUntilChanged, Observable, of, switchMap} from "rxjs";
import {Emittable, Emitter} from "@ngxs-labs/emitter";


@Component({
  selector: 'housemates-post-room',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatNativeDateModule, MatRadioModule, MatDatepickerModule, ImageUploaderComponent, ReactiveFormsModule],
  templateUrl: './post-room.component.html',
  styleUrls: ['./post-room.component.scss'],
})
export class PostRoomComponent {
  ageRange = AgeRange;

  storeService = inject(storeUtilityService)
  listingForm: FormGroup;
  @ViewSelectSnapshot(UtilityState.getStates) states?: StateModel[];
  @Emitter(ListingsState.postListing) postListingAction!: Emittable<any>

  lga$: Observable<Array<string>>

  constructor(private utilityService: UtilityService, private fb: FormBuilder) {
    this.listingForm = this.fb.group({
      listingGroupBy: ['student'],
      school: ['unilag'],
      state: ['lagos'],
      lga: [''],
      street: [''],
      propertyType: [''],
      numberOfRooms: [''],
      numberOfBathrooms: [''],
      availableRooms: [''],
      sharedRentAmount: [''],
      availableProperties: [''],
      rentCycles: ['yearly'],
      utilityBillPerMonth: [''],
      isRoomFurnished: ['true'],
      currentRoommateCount: this.fb.group({
        male: [0],
        female: [0]
      }),
      availableDate: [''],
      minimumStayMonths: ['1'],
      currentlyRoommateCount: ['1'],
      preferredGender: ['male'],
      preferredOccupation: ['student'],
      preferredAgeRange: ['18 - 20'],
      familyWithChildrenAllowed: ['false'],
      coupleAllowed: ['false'],
      petsAllowed: ['false'],
      smokingAllowed: ['false'],
      title: [''],
      description: [''],
      photos: [''],
      active: ['false'],

    })
    this.lga$ = this.listingForm.controls['state'].valueChanges.pipe(
      distinctUntilChanged(),
      switchMap((res) => this.storeService.getLgas(res))
    )
  }
   getFile(files: Array<{name: string, file: string}>) {
    this.listingForm.controls['photos'].patchValue(files);
  }

  submitListing() {
    this.postListingAction.emit(this.listingForm.value);
  }
}
