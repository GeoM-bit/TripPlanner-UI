import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { RegisterComponent } from './features/components/register/register.component';
import { LoginComponent } from './features/components/login/login.component';
import { LayoutComponent } from './core/components/layout/layout.component';

const routes: Routes = [
  {
    path:'', component: LayoutComponent, children: [{
      path: 'register', component: RegisterComponent
    },
      {
        path: 'login', component: LoginComponent
      }]
  },
  
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
