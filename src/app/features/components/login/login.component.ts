import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {LoginModel} from "../../../../models/loginModel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../core/utils/customValidators";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {UserRoles} from "../../../core/enums/userRoles";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel;
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private authenticationService: AuthenticationService, private snackBar: SnackBarComponent) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required, Validators.email, CustomValidators.WhitespaceInput]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  togglePasswordVisibility(element: HTMLElement) {
      this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.loginModel = this.loginForm.value;
    this.authenticationService.login(this.loginModel).subscribe((response: any) => {
      if(response!=null)
        this.redirectToViewBusinessTripsBasedOnRole(response);
      else
        this.openFailedLoginSnackBar();
    });
  }

  redirectToViewBusinessTripsBasedOnRole(response: any){
    let jwtData = response.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    let role = decodedJwtData.role;
    if(role==UserRoles[0])
    {
      //will be redirected to user page
    }
    else if(role==UserRoles[1])
    {
      //will be redirected to bto page
    }
  }

  openFailedLoginSnackBar() {
    this.snackBar.openSnackBar('Failed login attempt!','');
  }

}
