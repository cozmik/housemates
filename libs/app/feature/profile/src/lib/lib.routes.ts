import {Route} from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {FrameComponent} from "./frame/frame.component";
import {PostRoomComponent} from "./post-room/post-room.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {MyListingsComponent} from "./my-listings/my-listings.component";

export const profileRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'account'
  },
  {
    path: '',
    component: FrameComponent,
    children: [
      {
        path: 'account',
        component: ProfileComponent
      },
      {
        path: 'post-room',
        component: PostRoomComponent
      }
    ]
  },
  {
    path: 'listings',
    component: MyListingsComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
];
