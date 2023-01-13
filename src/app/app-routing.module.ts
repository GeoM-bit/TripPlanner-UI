import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { RegisterComponent } from './features/components/register/register.component';
import { LoginComponent } from './features/components/login/login.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import {ViewTripsPageComponent} from "./features/components/view-trips-page/view-trips-page.component";
import {RegisterTripsFormComponent} from "./features/components/register-trips-form/register-trips-form.component";
import {AuthGuardService} from "./core/guards/authGuard.service";
import {RegisterTripGuardService} from "./core/guards/registerTripGuard.service";
import {ForbiddenComponent} from "./core/components/forbidden/forbidden.component";

const routes: Routes = [
  {
    path:'', redirectTo:'/login',  pathMatch: 'full'
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'view-trips', component: ViewTripsPageComponent,canActivate: [AuthGuardService]
  },
  {
    path: 'register-trip', component: RegisterTripsFormComponent, canActivate: [AuthGuardService, RegisterTripGuardService]
  },
  {
    path: 'forbidden', component: ForbiddenComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
