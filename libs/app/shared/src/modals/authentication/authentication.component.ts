import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faGooglePlusG} from "@fortawesome/free-brands-svg-icons";
import {NgIconComponent} from "@ng-icons/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Emittable, Emitter} from "@ngxs-labs/emitter";
import {AuthenticationStateModel, AuthStateModule} from "@housemates/app/store";
import {ViewSelectSnapshot} from "@ngxs-labs/select-snapshot";

@Component({
  selector: 'housemates-authentication',
  standalone: true,
  imports: [CommonModule, NgIconComponent, FontAwesomeModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  @Emitter(AuthStateModule.registerUser) registerUserAction!: Emittable<{
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    ageRange: string,
    password: string
  }>;

  @Emitter(AuthStateModule.login) loginAction!: Emittable<{
    email: string,
    password: string
  }>;

  @ViewSelectSnapshot(AuthStateModule) auth?: AuthenticationStateModel;
  ageRange = [
    '18 - 20',
    '21 - 23',
    '23 - 25',
    '26 - 28',
    'Above 28'
  ]
  see = faEye;
  hide = faEyeSlash;
  facebook = faFacebookF;
  google = faGooglePlusG;
  showPass = false;
  register = true;
  registrationForm: FormGroup;
  loginForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AuthenticationComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      ageRange: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.loginForm = this.fb.group({
      email: ['cozmik05@gmail.com', Validators.required],
      password: ['qwertyuiop', Validators.required]
    })
  }

  async login() {
    this.loginForm.disable();
    await this.loginAction.emit(this.loginForm.value);
    this.loginForm.enable();
  }

  async registerUser() {
    this.registrationForm.disable();
    await this.registerUserAction.emit(this.registrationForm.value);
    this.registrationForm.enable();
  }
}
