import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { RegisterComponent } from './features/components/register/register.component';
import { SnackBarComponent } from './features/components/snack-bar/snack-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './features/components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FilterFormComponent } from './features/components/filter-form/filter-form.component';
import { TripsTableComponent } from './features/components/trips-table/trips-table.component';
import { ViewTripsPageComponent } from './features/components/view-trips-page/view-trips-page.component';
import {JwtInterceptor} from "./core/interceptor/token.interceptor";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CdkColumnDef} from "@angular/cdk/table";
import {CommonModule} from "@angular/common";
import {DialogComponent} from './features/components/dialog/dialog.component';
import { RegisterTripsFormComponent } from './features/components/register-trips-form/register-trips-form.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from "@angular/material/menu";
import { ForbiddenComponent } from './core/components/forbidden/forbidden.component';
import {JwtModule} from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    RegisterComponent,
    SnackBarComponent,
    LoginComponent,
    FilterFormComponent,
    TripsTableComponent,
    ViewTripsPageComponent,
    DialogComponent,
    RegisterTripsFormComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSortModule,
    MatMomentDateModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    CommonModule,
    MatMenuModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: CdkColumnDef},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
