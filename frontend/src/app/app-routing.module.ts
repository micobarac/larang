import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetRequestComponent } from './components/password/reset-request/reset-request.component';
import { ResetResponseComponent } from './components/password/reset-response/reset-response.component';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthGuard } from './guards/non-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'password/reset',
    children: [
      {
        path: 'request',
        component: ResetRequestComponent
      },
      {
        path: 'response',
        component: ResetResponseComponent
      }
    ],
    canActivate: [NonAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
