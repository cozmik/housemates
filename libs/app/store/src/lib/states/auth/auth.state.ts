import {Selector, State, StateContext } from '@ngxs/store';
import {EmitterAction, Receiver} from "@ngxs-labs/emitter";
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {tap} from "rxjs";
import {UserModel} from "@housemates/shared/model";
import {MatDialog} from "@angular/material/dialog";

export interface AuthenticationStateModel {
  data: UserModel | null;
  loading?: boolean;
  token?: string | null;
  loggedIn?: boolean;
}

@State<AuthenticationStateModel>({
  name: 'authStateModule'
})
export class AuthStateModule {
  static service: AuthService;
  static modal: MatDialog;
  @Selector()
  public static getAuthData(state: AuthenticationStateModel): AuthenticationStateModel {
    return AuthStateModule.getInstanceState(state);
  }

  @Selector()
  static getProfile(state: AuthenticationStateModel): UserModel | null {
    return state.data
  }

  @Selector()
  public static getToken(state: AuthenticationStateModel): string | null {
    return state.token ?? '';
  }

  @Selector()
  static isLoggedIn(state: AuthenticationStateModel): boolean | undefined {
    return state.loggedIn;
  }

  constructor() {
    AuthStateModule.service = inject(AuthService);
    AuthStateModule.modal = inject(MatDialog);
  }

  private static setInstanceState(state: AuthenticationStateModel): AuthenticationStateModel {
    return { ...state };
  }

  private static getInstanceState(state: AuthenticationStateModel): AuthenticationStateModel {
    return { ...state };
  }

  @Receiver()
  public static login(ctx: StateContext<AuthenticationStateModel>,
                      {payload}: EmitterAction<{email: string, password: string}>) {
    ctx.patchState({loading: true});
    return this.service.login(payload).pipe(
      tap((res: any) => {
        ctx.setState({loading: false, token: res.access_token, data: res.profile, loggedIn: true});
        this.modal.closeAll();
      })
    )
  }

  @Receiver()
  public static registerUser(ctx: StateContext<AuthenticationStateModel>, { payload }: EmitterAction<{
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    ageRange: string,
    password: string
  }>) {
    return this.service.register(payload).pipe(
      tap((res: any) => {
        ctx.setState({data: null, loading: false});
        this.modal.closeAll();
      })
    )
  }

  @Receiver()
  static updateUser(ctx: StateContext<AuthenticationStateModel>, {payload}: EmitterAction<any>) {
    ctx.patchState({loading: true})
    return this.service.updateProfile(payload).pipe(
      tap((res: any) => {
        ctx.patchState({data: res, loading: false})
      })
    )
  }

  @Receiver()
  static logout(ctx: StateContext<AuthenticationStateModel>) {

  }
}
